class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header id="siteHeader">
                <div>
                    <h1>Jacob Heiser</h1>
                    <p>Software Developer/Game Developer</p>
                </div>

                <div>
                    <input type="checkbox" id="menuBox" aria-disabled="true" />
                    <label class="hamburger" for="menuBox" aria-disabled="true">
                        <span class="hamburger-icon"></span>
                    </label>
                    
                    <nav>
                        <ul class="nav-links">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="aboutMe.html">About Me</a></li>
                            <li><a href="projects.html">Projects</a></li>
                            <li><a href="/files/JheiserResume.pdf" target="_blank">Resume</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
    }
}

class ValoHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header id="siteHeader">
                <h1>Valorant Randomizer</h1>
                
                <nav>
                    <ul class="nav-links">
                        <li><a href="../../index.html">Home</a></li>
                        <li><a href="rules.html">Rules</a></li>
                        <li><a href="feedback.html">Feedback</a></li>
                    </ul>
                </nav>
            </header>
        `;
    }
}

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div>
                    <ul class="footer-links">
                        <li>
                        <a
                            href="https://x.com/SchemaExe"
                            target="_blank"
                            aria-label="X(Twitter) icon"
                            title="Find me on X"
                            ><i class="fa-brands fa-x-twitter"></i> Twitter (X)</a>
                        </li>

                        <li>
                        <a
                            href="https://github.com/Cookiewaffles"
                            target="_blank"
                            aria-label="Github icon"
                            title="Browse my github page"
                            ><i class="fa-brands fa-github"></i> Github</a>
                        </li>

                        <li>
                        <a
                            href="https://www.linkedin.com/in/jacob-heiser-393131181"
                            target="_blank"
                            aria-label="Linkedin icon"
                            title="Find me on linkedin"
                            ><i class="fab fa-linkedin"></i> Linkedin</a>
                        </li>

                        <li>
                        <a
                            href="https://www.youtube.com/@schemaexe"
                            target="_blank"
                            aria-label="Youtube icon"
                            title="Find me on Youtube"
                            ><i class="fa-brands fa-youtube"></i> Youtube</a>
                        </li>

                        <li>
                        <a
                            href="https://www.twitch.tv/schemaexecute"
                            target="_blank"
                            aria-label="Twitch icon"
                            title="Find me on Twitch"
                            ><i class="fa-brands fa-twitch"></i> Twitch</a>
                        </li>

                        <li>
                        <a
                            href="https://www.tiktok.com/@schemaexe"
                            target="_blank"
                            aria-label="Tiktok icon"
                            title="Find me on Tiktok"
                            ><i class="fa-brands fa-tiktok"></i> Tiktok</a>
                        </li>
                    </ul>
                </div>
                <div class="user-info">
                    <p>@schemaExe</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);
customElements.define('valo-header', ValoHeader);