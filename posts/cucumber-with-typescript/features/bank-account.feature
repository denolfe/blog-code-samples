Feature: Bank Account
  In order to do save money
  As a responsible adult
  I want to store by money in a bank account

  Scenario: Stores money
    Given A bank account with starting balance of $100
    When $100 is deposited
    Then The bank account balance should be $200
