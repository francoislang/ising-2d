pub struct PRNG {
    seed: u64,
}

impl PRNG {
    pub fn new(seed: u64) -> Self {
        Self { seed }
    }

    pub fn random(&mut self) -> u64 {
        if self.seed == 0 {
            self.seed = 1;
        }
        self.seed ^= self.seed << 13;
        self.seed ^= self.seed >> 7;
        self.seed ^= self.seed << 17;
        self.seed
    }
}
