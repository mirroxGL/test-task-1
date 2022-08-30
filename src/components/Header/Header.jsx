import React from 'react'
import { Component } from 'react';
import logo from '../.././assets/images/logo.svg'
import vectorDown from '../.././assets/images/vectorDown.svg'
import vectorUp from '../.././assets/images/vectorUp.svg'
import cart from '../.././assets/images/cart.svg'
import s from "./header.module.css"
import b from "../Cart/Cart.module.css"
import { NavLink } from 'react-router-dom';
import { toggleCartRevealAC } from '../../redux/cart-reducer';
import Currency from './Currency/Currency';




class Header extends Component {
   constructor(props) {
      super(props);
      this.cartRef = React.createRef();
      this.currencyRef = React.createRef();
      this.hideAllWindows = this.hideAllWindows.bind(this)
   }

   componentDidMount() {
      this.props.getCategories()
   }

   componentDidUpdate() {

   }


   hideAllWindows = () => {
      this.props.toggleCartReveal(false)
      this.props.toggleCurrencyReveal(false)
   }



   handleCartMouseClick = (e) => {

      this.props.toggleCurrencyReveal(false)
      this.props.toggleCartReveal(true)
      if (this.props.isToggleCartReveal) {
         this.props.toggleCartReveal(false)
      }



   }

   handleCurrencyMouseClick = (e) => {
      this.props.toggleCartReveal(false)
      this.props.toggleCurrencyReveal(true)
      if (this.props.isToggleCurrencyReveal) {
         this.props.toggleCurrencyReveal(false)
      }

   }
   handleCategoryClick = (category, i) => {
      this.props.setActiveCategory(category.name)
      this.props.setActiveBodyCategory(i)
   }




   render() {
      return (
         <header>
            <div className={s.flexNavBlock}>
               <div className={s.categoriesBlock}>
                  <ul className={s.categories}>
                     {this.props.categories?.map((category, i) => {
                        return <li key={i} onClick={() => this.handleCategoryClick(category, i)} className={s.categories__item}><a className={this.props.activeCategory === category.name ? s.active : 0}>{category.name}</a></li>
                     })}
                  </ul>
               </div>
               <NavLink onClick={this.hideAllWindows} to="/" className={s.logoBlock}>
                  <img src={logo} alt="logo" />
               </NavLink>
               <div className={s.cartNcurrency}>
                  <div ref={this.currencyRef} onClick={this.handleCurrencyMouseClick} className={s.currencyBlock}>
                     <a className={s.currency}>$<img className={s.vector} src={this.props.isToggleCurrencyReveal ? vectorUp : vectorDown} alt="" /> </a>
                  </div>

                  <div ref={this.cartRef} onClick={this.handleCartMouseClick} className={s.cart}>
                     <div style={{ display: this.props.itemsSumCount == 0 && "none" }} className={s.itemsCount}><span>{this.props.itemsSumCount}</span></div>
                     <a><img src={cart} alt="" /></a>
                  </div>
               </div>
            </div>
         </header >
      )
   }

}


export default Header