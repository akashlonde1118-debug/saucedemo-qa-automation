@ui @purchase
Feature: Successful purchase on SauceDemo
  As a standard customer
  I want to buy a product
  So that I can verify the end-to-end checkout journey

  Scenario: Purchase Sauce Labs Backpack successfully
    Given I am on the SauceDemo login page
    When I log in with valid credentials
    Then I should see the products page
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"
    When I open the cart and proceed to checkout
    And I enter checkout details "Akash" "Londe" "400001"
    And I finish the purchase
    Then I should see the order confirmation
