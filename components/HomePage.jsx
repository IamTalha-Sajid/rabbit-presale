import React from "react";
import Image from "next/image";
import WalletModal from "@/components/WalletModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppContext } from "@/contexts/AppContext";
import useWalletMultiButton from "@/hooks/useWalletMultiButton"; // Importing the custom hook
import { signIn } from "@/action";
import { useState, useEffect, useCallback } from "react";
import "./HomePage.css"; // Importing the HomePage.css file

const HomePage = () => {
    const wallet = useWallet();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isSigned, setIsSigned } = useAppContext();
    const { buttonState, onDisconnect } = useWalletMultiButton({});

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        sign();
    };

    useEffect(() => {
        if (buttonState === "connected") {
            closeModal();
        } else if (buttonState === "no-wallet") {
            setIsSigned(false);
        }
    }, [buttonState]);

    const handleWalletChange = () => {
        console.log("Button State: ", buttonState);
        switch (buttonState) {
          case "no-wallet":
            openModal();
            break;
          default:
            if (isSigned) signOut();
            onDisconnect();
        }
      };

    const sign = useCallback(async () => {
        if (isSigned) return;
        if (buttonState == "connected") {
            const response = await signIn(wallet);
            setIsSigned(response.isSigned);
        }
    }, [isSigned, buttonState, wallet, setIsSigned, onDisconnect]);

    const signOut = useCallback(async () => {
        window.localStorage.removeItem("token");
        setIsSigned(false);
    }, [setIsSigned]);

    return (
        <div className="container">
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <a href="#top">
                            <img src="images/logo.png" alt="Rabbitholes Finance" />
                        </a>
                    </div>
                    <ul className="nav-links">
                        <li>
                            <a href="#top">Home</a>
                        </li>
                        <li>
                            <a href="#what-we-do">What we do?</a>
                        </li>
                        <li>
                            <a href="#tokenomics">Tokenomics</a>
                        </li>
                        <li>
                            <a href="#roadmap">Roadmap</a>
                        </li>
                        <li>
                            <a href="#faq">FAQ</a>
                        </li>
                    </ul>
                    <button className="cta-button">Get Started with $RHFI</button>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-text">
                    <h1 id="hover-text" className="hover-effect">
                        Follow the white rabbit
                        <br />
                        to financial liberation
                    </h1>
                    <p className="hover-effect">
                        Explore the Fusion of Social and Decentralized Finance. Rabbits
                        bring together the social networking and decentralized finance,
                        empowering users to connect, create, and earn in a gamified
                        ecosystem.
                    </p>
                    <button className="cta-button">Buy now</button>
                </div>
                <div className="hero-graphic">
                    <img className="dog-running" src="./images/rabbit-outer-img.png" alt="Rabbit" />
                </div>
            </section>

            {/* What We Do Section */}
            <section id="what-we-do">
                <h2 id="hover-text-what">What we do?</h2>
                <p>Welcome to the future of SocialFi</p>
                <p>
                    We are creating a community-driven world that celebrates the excitement and possibilities
                    of decentralized finance.
                </p>
                <p>
                    Degens, memecoin traders and conspiracy theorists, along with anyone curious about crypto,
                    are welcome to join our interactive platform where users can earn, explore and connect.
                    Our vision is of a user-owned and operated social network that allows those users to
                    profit off their activity.
                </p>
            </section>

            {/* Tokenomics Section */}
            <section id="tokenomics">
                <h2 id="hover-text-to">Tokenomics</h2>
                <p>
                    Our platform integrates a native utility and governance token, $RHFI. This token is
                    central to facilitating platform transactions, granting user incentives and participating
                    in the platform's governance. Users can earn $RHFI through various activities, which may
                    include completing quests, staking, or otherwise contributing to the platform's ecosystem.
                </p>
                <div className="token-chart">
                    <img src="./images/tokenomics-img.png" alt="Tokenomics" id="zoomable-image" />
                </div>
            </section>

            {/* Buy Token Section */}
            <section id="buy-token">
                <h2 id="hover-text-buy">Buy Token Now</h2>
                <div className="buy-token-info">
                    <div className="tok-left">
                        <div className="token-details">
                            <h3>Welcome to the world of rabbitholes finance</h3>
                            <p className="hover-effect">
                                $RHFI is your gateway to a new era of decentralized finance, merging the worlds of
                                crypto and social networking. Get ready to elevate your crypto journey with $RHFI.
                                Buy now and be part of a revolution that aims for financial freedom with a vibrant,
                                community-driven-and-owned social network and DeFi protocol.
                            </p>
                        </div>
                        <button className="cta-button">Buy now</button>
                    </div>
                    <div className="tok-right">
                        <div className="presale-widget">
                            <h4>Presale ends in</h4>
                            <div className="countdown-container">
                                <div className="countdown-item">
                                    <div className="circle">
                                        <span id="days">10</span>
                                        <p>Days</p>
                                    </div>
                                </div>
                                <div className="countdown-item">
                                    <div className="circle">
                                        <span id="hours">12</span>
                                        <p>Hours</p>
                                    </div>
                                </div>
                                <div className="countdown-item">
                                    <div className="circle">
                                        <span id="minutes">45</span>
                                        <p>Min</p>
                                    </div>
                                </div>
                                <div className="countdown-item">
                                    <div className="circle">
                                        <span id="seconds">23</span>
                                        <p>Sec</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cus-fea">
                            <div className="top-line-flex">
                                <p>Token Name:</p>
                                <p>$RHFI</p>
                            </div>
                            <p>Presale Price:</p>
                            <p>Launch Price:</p>
                            <div className="progress-container">
                                <div className="progress-label">
                                    <span>Presale Sold:</span>
                                    <span className="progress-percentage">70%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "70%" }}></div>
                                </div>
                            </div>
                            <div className="top-line-flex">
                                <p>Amount in SOL you pay:</p>
                                <p>0.00 SOL</p>
                            </div>
                            <div className="input-container">
                                <input type="text" className="styled-input" placeholder="0" />
                            </div>
                            <div className="top-line-flex">
                                <p>Amount of $RHFI you recieve:</p>
                            </div>
                            <div className="input-container">
                                <input type="text" className="styled-input" placeholder="0" />
                            </div>
                        </div>
                        <button className="cta-button" onClick={handleWalletChange}>
                            {buttonState == "no-wallet" ? "Connect Your Wallet" : "Disconnect Wallet"}
                        </button>
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section id="roadmap">
                <h2 id="hover-text-road">Roadmap</h2>
                <div className="test-sec">
                    <div className="timeline-container">
                        <div className="timeline">
                            {/* Phase 1 */}
                            <div className="phase">
                                <div className="speech-bubble">
                                    <p>Phase 1:</p>
                                    <p className="cus-line-he">
                                        <span>The Burrow Awakens</span>
                                    </p>
                                </div>
                                <div className="description">
                                    <p>
                                        rabbitholes finance is prepping for its first leap! We're perfecting
                                        every detail to make this journey unforgettable.
                                    </p>
                                    <ul>
                                        <li>Core Team Assembled: Gathering experts from every corner of the DeFi world.</li>
                                        <li>Tokenomics Blueprint: Crafting a rewarding ecosystem.</li>
                                        <li>Smart Contract Audit: Fortifying our burrow with security.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Phase 2 */}
                            <div className="phase">
                                <div className="speech-bubble">
                                    <p>Phase 2:</p>
                                    <p className="cus-line-he">
                                        <span>Into the Rabbit Hole!</span>
                                    </p>
                                </div>
                                <div className="description">
                                    <p>
                                        rabbitholes is ready to dive deep! We're set for a grand launch
                                        across platforms.
                                    </p>
                                    <ul>
                                        <li>Marketing Kickoff: Spreading the word far and wide.</li>
                                        <li>Exciting Giveaways: Engaging our community with awesome rewards.</li>
                                        <li>Staking Interface Live: Giving users the chance to earn as they play.</li>
                                        <li>Strategic Partnerships: Teaming up to broaden rabbitholes' impact.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Phase 3 */}
                            <div className="phase">
                                <div className="speech-bubble">
                                    <p>Phase 3:</p>
                                    <p className="cus-line-he">
                                        <span>Unlocking New Realms</span>
                                    </p>
                                </div>
                                <div className="description">
                                    <p>
                                        The adventure grows as rabbitholes expands its reach and rewards!
                                    </p>
                                    <ul>
                                        <li>NFT Collection Drops: Launching collectible treasures for our explorers.</li>
                                        <li>Token Burn Event: Strengthening value for $RHFI holders.</li>
                                        <li>DEX Listing: Making $RHFI accessible across decentralized exchanges.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Phase 4 */}
                            <div className="phase">
                                <div className="speech-bubble">
                                    <p>Phase 4:</p>
                                    <p className="cus-line-he">
                                        <span>A DeFi Wonderland</span>
                                    </p>
                                </div>
                                <div className="description">
                                    <p>
                                        rabbitholes finance is going global, redefining decentralized
                                        finance with every leap!
                                    </p>
                                    <ul>
                                        <li>Official Merchandise: Show your rabbitholes pride with exclusive gear.</li>
                                        <li>RabbitScan Launch: Our unique blockchain explorer for transparency.</li>
                                        <li>Tier 1 Exchange Listings: Bringing $RHFI to top exchanges worldwide.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Phase 5 */}
                            <div className="phase">
                                <div className="speech-bubble">
                                    <p>Phase 5:</p>
                                    <p className="cus-line-he">
                                        <span>A DeFi Wonderland</span>
                                    </p>
                                </div>
                                <div className="description">
                                    <p>
                                        rabbitholes finance is going global, redefining decentralized
                                        finance with every leap!
                                    </p>
                                    <ul>
                                        <li>Official Merchandise: Show your rabbitholes pride with exclusive gear.</li>
                                        <li>RabbitScan Launch: Our unique blockchain explorer for transparency.</li>
                                        <li>Tier 1 Exchange Listings: Bringing $RHFI to top exchanges worldwide.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Phase 6 */}
                            <div className="phase">
                                <div className="speech-bubble">
                                    <p>Phase 6:</p>
                                    <p className="cus-line-he">
                                        <span>A DeFi Wonderland</span>
                                    </p>
                                </div>
                                <div className="description">
                                    <p>
                                        rabbitholes finance is going global, redefining decentralized
                                        finance with every leap!
                                    </p>
                                    <ul>
                                        <li>Official Merchandise: Show your rabbitholes pride with exclusive gear.</li>
                                        <li>RabbitScan Launch: Our unique blockchain explorer for transparency.</li>
                                        <li>Tier 1 Exchange Listings: Bringing $RHFI to top exchanges worldwide.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq">
                <h2 id="hover-text-faq">Frequently Asked Questions</h2>
                <div className="accordion">
                    <div className="accordion-item">
                        <button className="accordion-header open-header">
                            What is RabbitHoles Finance?
                            <span className="arrow">▲</span>
                        </button>
                        <div className="accordion-content open">
                            <p>
                                RabbitHoles Finance is a gamified DeFi platform that combines financial rewards with
                                fun, game-like experiences.
                            </p>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <button className="accordion-header open-header">
                            What is RabbitHoles Finance?
                            <span className="arrow">▲</span>
                        </button>
                        <div className="accordion-content open">
                            <p>
                                RabbitHoles Finance is a gamified DeFi platform that combines financial rewards with
                                fun, game-like experiences.
                            </p>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <button className="accordion-header open-header">
                            What is RabbitHoles Finance?
                            <span className="arrow">▲</span>
                        </button>
                        <div className="accordion-content open">
                            <p>
                                RabbitHoles Finance is a gamified DeFi platform that combines financial rewards with
                                fun, game-like experiences.
                            </p>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <button className="accordion-header open-header">
                            What is RabbitHoles Finance?
                            <span className="arrow">▲</span>
                        </button>
                        <div className="accordion-content open">
                            <p>
                                RabbitHoles Finance is a gamified DeFi platform that combines financial rewards with
                                fun, game-like experiences.
                            </p>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <button className="accordion-header open-header">
                            What is RabbitHoles Finance?
                            <span className="arrow">▲</span>
                        </button>
                        <div className="accordion-content open">
                            <p>
                                RabbitHoles Finance is a gamified DeFi platform that combines financial rewards with
                                fun, game-like experiences.
                            </p>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <button className="accordion-header open-header">
                            What is RabbitHoles Finance?
                            <span className="arrow">▲</span>
                        </button>
                        <div className="accordion-content open">
                            <p>
                                RabbitHoles Finance is a gamified DeFi platform that combines financial rewards with
                                fun, game-like experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="foot-img">
                    <div className="container">
                        <img src="./images/logo-bottom.png" alt="Rabbit" />
                    </div>
                </div>
                <div className="social-icons">
                    <div className="container">
                        <p>Follow us on:</p>
                        <p>
                            <a href="#">
                                <img src="./images/social-icon-1.png" alt="" />
                            </a>
                            <a href="#">
                                <img src="./images/social-icon-2.png" alt="" />
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
            <WalletModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default HomePage;