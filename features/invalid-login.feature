@ui @negative
Feature: Invalid login on SauceDemo
  As an unauthenticated user
  I want to see a useful error
  So that I know my login was not accepted

  Scenario: Invalid credentials show an error
    Given I am on the SauceDemo login page
    When I log in with username "invalid_user" and password "wrong_password"
    Then I should see the login error message
    And I should remain on the login page
