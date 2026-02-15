use rand_chacha::ChaCha8Rng;
use rand_chacha::rand_core::SeedableRng;

pub enum InitMode {
    Up,
    Random
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
    rng: ChaCha8Rng
}

impl IsingModel {
    pub fn new(network_length: usize, seed: u64, temperature: f64, exchange_interaction: f64, external_field: f64, init_mode: InitMode) -> Self {
        let spins = match init_mode {
            InitMode::Up => vec![1i8; network_length * network_length],
            InitMode::Random => todo!()
        };

        let mut magnetization = 0.0;

        for spin in &spins {
            magnetization += *spin as f64;
        }

        let mut interaction_energy = 0.0;

        for i in 0..network_length {
            for j in 0..network_length {
                let site = spins[i * network_length + j] as f64; // penser au fait que spins est un tableau 1D et pas une matrice
                let right = spins[i * network_length + (j + 1) % network_length] as f64;
                let down = spins[((i + 1) % network_length) * network_length + j] as f64;
                interaction_energy += site * right + site * down;
            }
        }

        let energy = - exchange_interaction * interaction_energy - external_field * magnetization;



        IsingModel {
            network_length,
            spins,
            temperature,
            external_field,
            exchange_interaction,
            step_count: 0,
            energy,
            magnetization,
            rng: ChaCha8Rng::seed_from_u64(seed)
        }
    }
}
