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

#[cfg(test)]
mod tests {
    use super::PRNG;
    #[test]
    fn deterministic_prng() {
        let mut random1 = PRNG::new(1);
        let mut random2 = PRNG::new(1);
        let vec1 = (0..1000).map(|_| random1.random_range(1000)).collect::<Vec<usize>>();
        let vec2 = (0..1000).map(|_| random2.random_range(1000)).collect::<Vec<usize>>();
        assert_eq!(vec1, vec2)
    }
}
