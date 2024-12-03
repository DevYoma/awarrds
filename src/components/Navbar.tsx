import { useEffect, useRef, useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar = () => {
  const navItems = ['Nexus', 'About', 'Contact', 'Blog', 'Careers', 'Support']
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if(currentScrollY === 0){
        setIsNavVisible(true);
        navContainerRef.current.classList.remove('floating-nav'); // removing class based on scroll position
    }
    else if(currentScrollY > lastScrollY){
        setIsNavVisible(false);
        navContainerRef.current.classList.add('floating-nav'); // adding class based on scroll position
    }else if(currentScrollY < lastScrollY){
        setIsNavVisible(true)
        navContainerRef.current.classList.add('floating-nav'); // adding class based on scroll position
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY])

  // useEffect to add GSAP animation when navbar visibility changes
  useEffect(() => {
    gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2
    })
  }, [isNavVisible])

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  }

  useEffect(() => {
    if (audioElementRef.current) {
      if (isAudioPlaying) {
        audioElementRef.current.play();
      } else {
        audioElementRef.current.pause();
      }
    }
  }, [isAudioPlaying])

  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
        <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex size-full items-center justify-between p-4">
                <div className="flex items-center gap-7">
                    <img src="/img/logo.png" alt="logo" className="w-10"/>

                    <Button 
                        id="product-button"
                        title="Products"
                        rightIcon={<TiLocationArrow />}
                        containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                    />
                </div>

                <div className="flex h-full items-center">
                    <div className="hidden md:block">
                        {navItems.map((item, index) => (
                            <a key={index} className="nav-hover-btn" href={`#${item.toLowerCase()}`}>{item}</a>
                        ))}
                    </div>

                    <button 
                        className="ml-10 flex items-center space-x-0.5"
                        onClick={toggleAudioIndicator}
                    >
                        <audio 
                            ref={audioElementRef}
                            className="hidden"
                            src="/audio/loop.mp3"
                            loop
                        />
                            {[1,2,3,4].map((bar) => (
                                <div 
                                    key={bar}
                                    className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                    style={{
                                        animationDelay: `${bar * 0.1}s`
                                    }}
                                />
                            ))}
                        {/* </audio> */}
                    </button>
                </div>
            </nav>
        </header>
        
    </div>
  )
}

export default Navbar