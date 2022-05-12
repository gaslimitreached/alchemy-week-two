// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Coffee.sol";

contract BaristaTest is Test {
    Barista internal barista;
    string internal message = "hello world";
    string internal name = "bob";
    address internal bob = address(0xB0B);
    
    event NewCoffee(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    function setUp() public {
        barista = new Barista();
        vm.label(bob, "BOB");
        vm.deal(bob, 1 ether);
    }

    function testBuyCoffee() public {
        vm.prank(bob);
        vm.expectEmit(true, true, true, true);
        emit NewCoffee(bob, block.timestamp, name, message);
        barista.buy{value: 0.1 ether}(name, message);
        assertEq(barista.getAll().length, 1);
        assertEq(barista.getTotalCoffee(), 1);
    }

    function testWithdraw() public {
        vm.prank(bob);
        uint before = address(this).balance;
        barista.buy{value: 0.1 ether}(name, message);
        barista.withdraw();
        assertEq(address(this).balance, before + 0.1 ether);
    }

    function testBuyWithNoValue() public {
        vm.expectRevert(abi.encodeWithSignature("Barista__NotEnough()"));
        barista.buy(message, name);
    }

    receive() external payable {}
}
