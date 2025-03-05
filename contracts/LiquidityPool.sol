// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LiquidityPool is ERC20 {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public reserveA;
    uint256 public reserveB;

    constructor(IERC20 _tokenA, IERC20 _tokenB) ERC20("Liquidity Provider Token", "LPT") {
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function addLiquidity(uint amountA, uint amountB) external {
        require(tokenA.transferFrom(msg.sender, address(this), amountA), "Failed Transfer TokenA");
        require(tokenB.transferFrom(msg.sender, address(this), amountB), "Failed Transfer TokenB");

        reserveA += amountA;
        reserveB += amountB;

        uint liquidity = amountA + amountB;
        _mint(msg.sender, liquidity);
    }
}