import { useEffect, useState } from 'react';
import './App.css';
import LogoImage from "./svg/main-logo.svg";
import LogoText from "./svg/logo-text.svg";
import TokenSvg from "./svg/token.svg";
import PairSvg from "./svg/pair.svg";
import FacebookSvg from "./svg/facebook.svg";
import LinkedinSvg from "./svg/linkedin.svg";
import TwitterSvg from "./svg/twitter.svg";
import SearchSvg from "./svg/search.svg";

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [addressOption, setAddressOption] = useState("token-address");
    const [addressData, setAddressData] = useState([]);
    const [pairAddress, setPairAddress] = useState([]);
    const [tokenAddress, setTokenAddress] = useState([]);

    const loadData = async () => {
        try {
            const pairUrl = "https://api.dexscreener.com/latest/dex/search/?q=pair";
            let response = await fetch(pairUrl);
            if (response) {
                const data = await response.json();
                setPairAddress(
                    data?.pairs.length > 10
                        ? data.pairs.splice(0, 10)
                        : data.pairs
                ); //limit to 10 results only
            }
            const tokenUrl =
                "https://api.dexscreener.com/latest/dex/search/?q=token";
            response = await fetch(tokenUrl);
            if (response) {
                const data = await response.json();
                setTokenAddress(data?.pairs.length > 10? data.pairs.splice(0, 10): data.pairs); //limit to 10 results only
            }

            if (addressData?.length === 0) setAddressData(tokenAddress); //by default
        } catch (error) {
            console.error("Error fetching results: ", error);
        }
    };
    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://api.dexscreener.com/latest/dex/search/?q=${searchQuery}`
            );
            const data = await response.json();
            //   setSearchResults(data.results);
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    };

    /* eslint-disable no-console */
    /*eslint-disable-next-line*/
    useEffect(() => {
        /*eslint-disable-next-line*/
        loadData();
        /*eslint-disable-next-line*/
    }, []);

    return (
        <main className="main">
            <section className="upper">
                <section className="sidebar">
                    <h1>
                        <a className="logo" href="./" rel="noreferrer">
                            <img
                                className="logo-image"
                                src={LogoImage}
                                alt="logo svg"
                            />
                            <img
                                className="logo-text"
                                src={LogoText}
                                alt="logo text svg"
                            />
                        </a>
                    </h1>
                    <div className="flex">
                        <div className="options">
                            <div
                                className={`option token-address ${
                                    addressOption === "token-address"
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => {
                                    setAddressOption("token-address");
                                    setAddressData([...tokenAddress]);
                                }}
                            >
                                <img
                                    className="token-svg"
                                    src={TokenSvg}
                                    alt="token svg"
                                />
                                <span>Token Address</span>
                            </div>
                            <div
                                className={`option pair-address ${
                                    addressOption === "pair-address"
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => {
                                    setAddressOption("pair-address");
                                    setAddressData([...pairAddress]);
                                }}
                            >
                                <img
                                    className="pair-svg"
                                    src={PairSvg}
                                    alt="pair svg"
                                />
                                <span>Pair Address</span>
                            </div>
                        </div>
                        <div className="social-media">
                            <img
                                className="facebook-svg"
                                src={FacebookSvg}
                                alt="facebook svg"
                            />
                            <img
                                className="linkedin-svg"
                                src={LinkedinSvg}
                                alt="linkedin svg"
                            />
                            <img
                                className="twitter-svg"
                                src={TwitterSvg}
                                alt="twitter svg"
                            />
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="head">
                        <div className="search">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="search-svg" onClick={handleSearch}>
                                <img src={SearchSvg} alt="search svg" />
                            </span>
                        </div>
                        <div className="connect">Connect</div>
                    </div>
                    {addressOption !== "" && (
                        <section className="results-container">
                            <h2 className="heading">
                                {addressOption === "pair-address"
                                    ? "Pair Search Results"
                                    : "Token Search Results"}
                            </h2>
                            <section className="results">
                                {addressData.map((el) => (
                                    <div
                                        className="result"
                                        key={el.pairAddress}
                                    >
                                        <a href={el.url}>
                                            <div className="card basic-info">
                                                <h3 className="title">
                                                    Basic Info
                                                </h3>
                                                <p className="data">
                                                    <span className="key">
                                                        Pair created at
                                                    </span>
                                                    <span className="value">
                                                        {el.pairCreatedAt}
                                                    </span>
                                                </p>
                                                <p className="data">
                                                    <span className="key">
                                                        Symbol
                                                    </span>
                                                    <span className="value">
                                                        {el.baseToken.symbol}
                                                    </span>
                                                </p>
                                                <p className="data">
                                                    <span className="key">
                                                        Dex Id
                                                    </span>
                                                    <span className="value">
                                                        {el.dexId}
                                                    </span>
                                                </p>
                                                <p className="data">
                                                    <span className="key">
                                                        Pair Address
                                                    </span>
                                                    <span className="value">
                                                        {el.pairAddress}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="card base-token">
                                                <h3 className="title">
                                                    Base Token
                                                </h3>

                                                <p className="data">
                                                    <span className="key">
                                                        Name
                                                    </span>
                                                    <span className="value">
                                                        {el.baseToken.name}
                                                    </span>
                                                </p>
                                                <p className="data">
                                                    <span className="key">
                                                        Symbol
                                                    </span>
                                                    <span className="value">
                                                        {el.baseToken.symbol}
                                                    </span>
                                                </p>
                                                <p className="data">
                                                    <span className="key">
                                                        Address
                                                    </span>
                                                    <span className="value">
                                                        {el.baseToken.address}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="card quote-token">
                                                <h3 className="title">
                                                    Quote Token
                                                </h3>
                                                <p className="data">
                                                    <span className="key">
                                                        Name
                                                    </span>
                                                    <span className="value">
                                                        {el.quoteToken.name}
                                                    </span>
                                                </p>
                                                <p className="data">
                                                    <span className="key">
                                                        Symbol
                                                    </span>
                                                    <span className="value">
                                                        {el.quoteToken.symbol}
                                                    </span>
                                                </p>
                                                <p className="data">
                                                    <span className="key">
                                                        Address
                                                    </span>
                                                    <span className="value">
                                                        {el.quoteToken.address}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="card price">
                                                <h3 className="title">Price</h3>
                                                <p className="data">
                                                    <span className="key">
                                                        Price Native
                                                    </span>
                                                    <span className="value">
                                                        {el.priceNative}
                                                    </span>
                                                </p>
                                                <p className="data">
                                                    <span className="key">
                                                        Price USD
                                                    </span>
                                                    <span className="value">
                                                        {el.priceUsd}
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </section>
                        </section>
                    )}
                </section>
            </section>
            <section className="lower">
                <footer className="footer"></footer>
            </section>
        </main>
    );
}

export default App;
