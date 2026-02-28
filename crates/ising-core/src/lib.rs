use rand::RngExt;
use rand_chacha::rand_core::SeedableRng;
use rand_chacha::ChaCha8Rng;

pub enum InitMode {
    Up,
    Random,
}
pub struct IsingModel {
    network_length: usize,
    spins: Vec<i8>,
    temperature: f64,
    external_field: f64,
    exchange_interaction: f64,
    step_count: usize,
    energy: f64,
    magnetization: f64,
    rng: ChaCha8Rng,
}

impl IsingModel {
    pub fn new(
        network_length: usize,
        seed: u64,
        temperature: f64,
        exchange_interaction: f64,
        external_field: f64,
        init_mode: InitMode,
    ) -> Self {
        let mut rng = ChaCha8Rng::seed_from_u64(seed);

        let spins = match init_mode {
            InitMode::Up => vec![1i8; network_length * network_length],
            InitMode::Random => {
                let mut vec = vec![];
                for _ in 0..network_length * network_length {
                    let spin = rng.random_range(0..2);
                    if spin == 0 { vec.push(-1) } else { vec.push(1) }
                }
                vec
            }
        };

        let mut magnetization = 0.0;

        for spin in &spins {
            magnetization += *spin as f64;
        }

        let mut interaction_energy = 0.0;

        // modulo car conditions périodiques sur ma grille de spin
        for i in 0..network_length {
            for j in 0..network_length {
                let site = spins[i * network_length + j] as f64; // penser au fait que spins est un tableau 1D et pas une matrice
                let right = spins[i * network_length + (j + 1) % network_length] as f64;
                let down = spins[((i + 1) % network_length) * network_length + j] as f64;
                interaction_energy += site * right + site * down;
            }
        }

        let energy = -exchange_interaction * interaction_energy - external_field * magnetization;

        IsingModel {
            network_length,
            spins,
            temperature,
            external_field,
            exchange_interaction,
            step_count: 0,
            energy,
            magnetization,
            rng,
        }
    }

    pub fn step(&mut self, n: usize) {
        for _ in 0..n {
            let random = self
                .rng
                .random_range(0..self.network_length * self.network_length);

            let random_spin = self.spins[random] as f64;
            let row = random / self.network_length;
            let column = random % self.network_length;
            let right_spin =
                self.spins[row * self.network_length + (column + 1) % self.network_length] as f64;
            let left_spin = self.spins[row * self.network_length
                + (column + self.network_length - 1) % self.network_length]
                as f64;
            let bottom_spin =
                self.spins[((row + 1) % self.network_length) * self.network_length + column] as f64;
            let top_spin = self.spins[((row + self.network_length - 1) % self.network_length)
                * self.network_length
                + column] as f64;

            let energy_variation = -2.0
                * random_spin
                * (self.exchange_interaction * (right_spin + left_spin + top_spin + bottom_spin)
                    + self.external_field);

            if energy_variation <= 0.0 {
                self.spins[random] = -self.spins[random];
                self.energy += energy_variation;
                self.magnetization += -2.0 * random_spin;
            } else {
                let proba = self.rng.random_range(0.0..1.0);
                let proba_boltzmann = (-energy_variation / self.temperature).exp();
                // il faut que la proba soit inférieur à boltzmann car le système physique ne veut pas augmenter son énergie
                if proba < proba_boltzmann {
                    self.spins[random] = -self.spins[random];
                    self.energy += energy_variation;
                    self.magnetization += -2.0 * random_spin;
                }
            }
            self.step_count += 1;
        }
    }

    pub fn energy(&self) -> f64 {
        self.energy
    }

    pub fn magnetization(&self) -> f64 {
        self.magnetization
    }

    pub fn step_count(&self) -> usize {
        self.step_count
    }

    pub fn spins(&self) -> &[i8] {
        &self.spins
    }
}
