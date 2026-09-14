#![cfg(test)]

use super::*;
use soroban_sdk::{vec, Env, String};

#[test]
fn test_get_info_and_version() {
    let env = Env::default();
    let contract_id = env.register(TrapTraceSandboxContract, ());
    let client = TrapTraceSandboxContractClient::new(&env, &contract_id);

    let info = client.get_info();
    assert_eq!(
        info,
        vec![
            &env,
            String::from_str(&env, "TrapTrace"),
            String::from_str(&env, "Soroban Diagnostic Sandbox v1.0"),
        ]
    );

    assert_eq!(client.version(), 1);
}

#[test]
fn test_trap_arith_success() {
    let env = Env::default();
    let contract_id = env.register(TrapTraceSandboxContract, ());
    let client = TrapTraceSandboxContractClient::new(&env, &contract_id);

    assert_eq!(client.trap_arith(&10, &20), 30);
}

#[test]
#[should_panic(expected = "TrapTrace: Arithmetic Overflow Trap")]
fn test_trap_arith_overflow() {
    let env = Env::default();
    let contract_id = env.register(TrapTraceSandboxContract, ());
    let client = TrapTraceSandboxContractClient::new(&env, &contract_id);

    client.trap_arith(&u64::MAX, &1);
}
