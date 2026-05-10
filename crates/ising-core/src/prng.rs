pub struct PRNG {
    state: u64,
}

impl PRNG {
    pub fn new(mut seed: u64) -> Self {
        if seed == 0 {
            seed = 1;
        }
        Self { state: seed }
    }

    pub fn random(&mut self) -> u64 {
        self.state ^= self.state << 13;
        self.state ^= self.state >> 7;
        self.state ^= self.state << 17;
        self.state
    }

    pub fn random_range(&mut self, max: u64) -> usize {
        (self.random() % max) as usize
    }

    pub fn random_float(&mut self) -> f64 {
        (self.random() >> 11) as f64 / (1u64 << 53) as f64
    }
}
