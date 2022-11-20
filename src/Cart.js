import React, { Component } from "react";

export default class Cart extends Component
{
    handleClick = () =>
    {
        this.props.toggle();
    };

    render() {
        return (
            <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <h1>Cart</h1>
          <div class = "cart-list">
            <div class = "test">
            {this.props.list()}
            <h2>Total</h2>
            ${Math.abs(this.props.total).toFixed(2)}
            </div>
            
          </div>
        </div>
      </div>
        )
    }
}