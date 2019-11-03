import React, { Component } from "react";
import { Loading } from "Components";
import { animChildren } from "Functions";

export class Stores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: { type: "loading", message: "" },
      stores: []
    };
  }
  redirect = () => {
    alert("Should I redirect ?");
  };
  componentDidMount = async () => {
    let stores = await this.getStores();
  };
  getStores = () => {
    return new Promise((resolve, reject) => {
      let stores = [
        {
          name: "Americanas",
          shortname: "Americanas",
          icon: "/img/stores/americanas.png",
          cashback: "1,5%",
          link: "http://americanas.com"
        },
        {
          name: "Netshoes",
          shortname: "Netshoes",
          icon: "/img/stores/netshoes.png",
          cashback: "1,5%",
          link: "http://americanas.com"
        },
        {
          name: "Casas Bahia",
          shortname: "CBahia",
          icon: "/img/stores/casas-bahia.png",
          cashback: "1,5%",
          link: "http://americanas.com"
        },
        {
          name: "Submarino",
          shortname: "Submarino",
          icon: "/img/stores/submarino.png",
          cashback: "1,5%",
          link: "http://submarino.com"
        },
        {
          name: "Elmo",
          shortname: "Elmo",
          icon: "/img/stores/elmo.png",
          cashback: "1,5%",
          link: "http://americanas.com"
        }
      ];
      setTimeout(() => {
        this.setState({ stores, status: { type: "complete" } });
        resolve(stores);
      }, 3000);
    });
  };
  _renderEmpty = () => {
    return <h1 className="title-no-stores">Ainda não há lojas parceiras</h1>;
  };
  _renderError = message => {
    return <h1>{message}</h1>;
  };
  _renderStores = stores => {
    setTimeout(() => {
      animChildren(document.querySelector(".stores"));
    }, 500);
    return stores.map((store, key) => {
      return (
        <div className="store anim-onload" onClick={this.redirect} key={key}>
          <img className="icon anim-onload" src={store.icon} />
          <div className="store-link">
            <div className="store-name">
              <p className="name">{store.name}</p>
              <p className="win">Ganhe {store.cashback}</p>
              <p className="cashback">de casback</p>
            </div>
            <img className="icon-go-img" src="img/icon-go.svg" alt="" />
          </div>
        </div>
      );
    });
  };
  render() {
    let { status, stores } = this.state;
    if (status.type === "loading") return <Loading />;

    if (!stores) {
      console.error("popup/render/stores, props.stores is an falsy value");
      return this._renderError(`Couldnt load stores, try contact us`);
    }
    if (stores.constructor.name !== "Array") {
      console.error("popup/render/stores, props.stores is not an array");
      return this._renderError("Couldnt load stores, try contact us");
    }
    if (stores.length > 0) return this._renderStores(stores);
    else return this._renderEmpty();
  }
}
