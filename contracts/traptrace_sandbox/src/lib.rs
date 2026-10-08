#![no_std]
use soroban_sdk::{contract, contractimpl, vec, Env, String, Vec};

#[contract]
pub struct TrapTraceSandboxContract;

#[contractimpl]
impl TrapTraceSandboxContract {
    /// Returns service identifier and version string for diagnostics
    pub fn get_info(env: Env) -> Vec<String> {
        vec![
            &env,
            String::from_str(&env, "TrapTrace"),
            String::from_str(&env, "Soroban Diagnostic Sandbox v1.0"),
        ]
    }

    /// Verification endpoint for live network health check
    pub fn version(_env: Env) -> u32 {
        1
    }

    /// Deliberate arithmetic overflow tester to reproduce host error traps in SDK
    pub fn trap_arith(_env: Env, a: u64, b: u64) -> u64 {
        a.checked_add(b)
            .expect("TrapTrace: Arithmetic Overflow Trap")
    }

    /// Basic greeting endpoint
    pub fn hello(env: Env, to: String) -> Vec<String> {
        vec![&env, String::from_str(&env, "TrapTrace"), to]
    }
}

mod test;
