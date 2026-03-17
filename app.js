/**
 * 22 YARDS CRICKET - APP CONTROLLER
 * SPA Hash Routing & View Management
 */

const App = {
    state: {
        currentRoute: '',
        players: [],
        squad: [], // Array of player IDs
        filters: {
            team: 'all',
            role: 'all',
            nat: 'all',
            form: 'all',
            tag: 'all',
            search: ''
        },
        sort: { key: 'overallRating', dir: 'desc' }
    },

    init() {
        if (typeof players === 'undefined') {
            console.error('CRITICAL: players variable is undefined. Check if players.js is loading correctly.');
        }
        this.state.players = typeof players !== 'undefined' ? players : [];
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
        this.initRevealObserver();
        this.initTicker();
        this.renderFranchiseHub();
    },

    handleRoute() {
        const hash = window.location.hash || '#/';
        this.state.currentRoute = hash;

        // Modal / Overlay cleaning
        document.body.classList.remove('modal-open');

        // Navigation Active State
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === hash);
        });

        if (hash === '#/' || hash === '') {
            this.renderLanding();
        } else if (hash.startsWith('#/players')) {
            this.renderPlayerDatabase();
        } else if (hash.startsWith('#/player/')) {
            const id = hash.split('/player/')[1];
            this.renderPlayerProfile(id);
        } else if (hash === '#/builder') {
            this.renderBuilder();
        } else if (hash.startsWith('#/team/')) {
            const team = hash.split('/team/')[1];
            this.renderTeamPage(team);
        }

        window.scrollTo(0, 0);
    },

    // --- VIEW RENDERING ---

    renderLanding() {
        this.showView('landing-view');
        this.renderFranchiseHub();
    },

    renderFranchiseHub() {
        const container = document.getElementById('team-grid');
        if (!container) return;
        const teams = [
            { id: 'MI', name: 'Mumbai Indians', tag: 'DYNAMO' },
            { id: 'CSK', name: 'Chennai Super Kings', tag: 'LEGACY' },
            { id: 'RCB', name: 'Royal Challengers Bengaluru', tag: 'POWER' },
            { id: 'KKR', name: 'Kolkata Knight Riders', tag: 'STRIKE' },
            { id: 'DC', name: 'Delhi Capitals', tag: 'REBOOT' },
            { id: 'PBKS', name: 'Punjab Kings', tag: 'HUNTER' },
            { id: 'RR', name: 'Rajasthan Royals', tag: 'TACTIC' },
            { id: 'SRH', name: 'Sunrisers Hyderabad', tag: 'ORANGE' },
            { id: 'GT', name: 'Gujarat Titans', tag: 'ELITE' },
            { id: 'LSG', name: 'Lucknow Super Giants', tag: 'NAVY' }
        ];

        container.innerHTML = teams.map(t => `
            <a href="#/team/${t.id.toLowerCase()}" class="team-card team-${t.id.toLowerCase()}">
                <span class="status-badge">${t.tag}</span>
                <div class="team-logo-placeholder">${t.id}</div>
                <div class="team-name">${t.name}</div>
            </a>
        `).join('');
    },

    renderPlayerDatabase() {
        const view = this.showView('database-view');
        this.renderFilters();
        this.renderTable();
    },

    renderPlayerProfile(id) {
        const player = this.state.players.find(p => p.id === id);
        if (!player) { window.location.hash = '#/players'; return; }

        const view = this.showView('profile-view');
        view.innerHTML = this.getProfileTemplate(player);
    },

    renderBuilder() {
        const view = this.showView('builder-view');
        view.innerHTML = `
            <div class="builder-container">
                <div class="builder-sidebar">
                    <div class="filter-header mono">Available Pool</div>
                    <div id="builder-search">
                        <input type="text" placeholder="Filter pool..." id="pool-search" class="mono">
                    </div>
                    <div id="player-pool" class="scroll-area"></div>
                </div>
                <div class="builder-main">
                    <div class="builder-header">
                        <h2 class="display">Playing 12 Selection</h2>
                        <div id="squad-validation" class="mono"></div>
                    </div>
                    <div id="squad-slots" class="grid-squad"></div>
                    <div id="builder-analytics" class="scout-verdict" style="margin-top: 40px; background: #fff; color: var(--ink); border: 1px solid var(--border);">
                        <div class="eyebrow mono">— Balance Scorecard</div>
                        <div id="balance-stats" class="grid" style="grid-template-columns: repeat(4, 1fr); margin-top: 20px;"></div>
                        <button class="btn btn-dark" onclick="App.generateReport()" style="margin-top: 30px;">Generate Intelligence Report</button>
                    </div>
                </div>
            </div>
        `;
        this.initBuilder();
    },

    renderTeamPage(slug) {
        const teamCode = slug.toUpperCase();
        const teamPlayers = this.state.players.filter(p => p.ipl2026Team === teamCode);
        if (!teamPlayers.length) { window.location.hash = '#/'; return; }

        const view = this.showView('team-view');

        const totalValue = teamPlayers.reduce((acc, p) => acc + (p.ipl2026Price || 0), 0).toFixed(2);
        const avgRating = (teamPlayers.reduce((acc, p) => acc + p.analytics.overallRating, 0) / teamPlayers.length).toFixed(1);
        const ovsCount = teamPlayers.filter(p => p.nationality === 'Overseas').length;

        view.innerHTML = `
            <div class="team-page">
                <div class="profile-header">
                    <div class="eyebrow mono">— Franchise Intelligence: ${teamCode}</div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid var(--ink); padding-bottom: 20px;">
                        <h1 class="display" style="font-size: 100px;">${teamCode} INtel</h1>
                        <div style="text-align: right;">
                            <div class="display" style="font-size: 60px; color: var(--gold); line-height: 1;">${avgRating}</div>
                            <div class="mono" style="font-size: 10px;">TEAM BALANCE SCORE</div>
                        </div>
                    </div>
                </div>

                <div class="grid" style="grid-template-columns: repeat(3, 1fr); margin: 40px 0;">
                    <div class="score-box"><span class="lbl">TOTAL SPEND</span><span class="val">₹${totalValue} CR</span></div>
                    <div class="score-box"><span class="lbl">SQUAD SIZE</span><span class="val">${teamPlayers.length}</span></div>
                    <div class="score-box"><span class="lbl">OVERSEAS SLOTS</span><span class="val">${ovsCount}/8</span></div>
                </div>

                <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 60px;">
                    <div>
                        <h3 class="mono" style="margin-bottom: 30px; border-bottom: 1px solid var(--border); padding-bottom: 10px;">Confirmed Roster</h3>
                        <div class="team-roster-grid">
                            ${teamPlayers.map(p => `
                                <div class="pool-item" onclick="window.location.hash='#/player/${p.id}'" style="display:flex; justify-content:space-between; align-items:center;">
                                    <div>
                                        <div style="font-weight:700">${p.name}</div>
                                        <div class="mono" style="font-size:9px; opacity:0.6">${p.role}</div>
                                    </div>
                                    <div class="display" style="color:var(--gold)">${p.analytics.overallRating}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div>
                        <div class="scout-verdict" style="background:var(--parchment); border:1px solid var(--border); color:var(--ink); padding:40px;">
                            <div class="eyebrow mono">— Strategy Assessment</div>
                            <ul class="mono" style="list-style:none; margin-top:20px; font-size:11px; line-height:2;">
                                <li>⚡ STRENGTH: Top-heavy batting</li>
                                <li>⚠️ GAP: Specialist death bowler</li>
                                <li>🎯 TARGET: High-pace enforcer</li>
                            </ul>
                            <div style="margin-top:40px; border-top:1px solid var(--border); padding-top:20px;">
                                <div class="mono" style="font-size:10px; opacity:0.6">WIN PROBABILITY RANK</div>
                                <div class="display" style="font-size:32px">TOP 4 CONTENTION</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    showView(id) {
        document.querySelectorAll('.app-view').forEach(v => v.style.display = 'none');
        const view = document.getElementById(id);
        if (view) view.style.display = 'block';
        return view;
    },

    // --- COMPONENTS ---

    renderFilters() {
        const container = document.getElementById('filter-bar');
        if (!container) return;

        container.innerHTML = `
            <div class="filter-header mono">
                <span>Filter Engine</span>
                <button class="btn btn-ghost" onclick="App.resetFilters()" style="padding: 5px 10px; font-size: 10px;">Reset</button>
            </div>
            <div class="filter-controls">
                <div class="input-wrap">
                    <input type="text" placeholder="Search Player..." id="search-input" value="${this.state.filters.search}">
                </div>
                <select id="team-filter" class="mono">
                    <option value="all">All Teams</option>
                    ${['MI', 'CSK', 'RCB', 'KKR', 'DC', 'PBKS', 'RR', 'SRH', 'GT', 'LSG'].map(t => `<option value="${t}" ${this.state.filters.team === t ? 'selected' : ''}>${t}</option>`).join('')}
                </select>
                <select id="role-filter" class="mono">
                    <option value="all">All Roles</option>
                    <option value="Batter">Batter</option>
                    <option value="Bowler">Bowler</option>
                    <option value="All-rounder">All-rounder</option>
                    <option value="Wicketkeeper-Batter">WK-Batter</option>
                </select>
                <select id="nat-filter" class="mono">
                    <option value="all">Nationality</option>
                    <option value="Indian">Indian</option>
                    <option value="Overseas">Overseas</option>
                </select>
            </div>
        `;

        const setupInp = (id, key) => document.getElementById(id).addEventListener('input', (e) => {
            this.state.filters[key] = e.target.value;
            this.renderTable();
        });

        setupInp('search-input', 'search');
        setupInp('team-filter', 'team');
        setupInp('role-filter', 'role');
        setupInp('nat-filter', 'nat');
    },

    resetFilters() {
        this.state.filters = { team: 'all', role: 'all', nat: 'all', form: 'all', tag: 'all', search: '' };
        this.renderPlayerDatabase();
    },

    renderTable() {
        const container = document.getElementById('player-table-body');
        if (!container) return;

        let filtered = this.state.players.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(this.state.filters.search.toLowerCase());
            const matchesTeam = this.state.filters.team === 'all' || p.ipl2026Team === this.state.filters.team;
            const matchesRole = this.state.filters.role === 'all' || p.role === this.state.filters.role;
            const matchesNat = this.state.filters.nat === 'all' || p.nationality === this.state.filters.nat;
            return matchesSearch && matchesTeam && matchesRole && matchesNat;
        });

        // Sorting
        filtered.sort((a, b) => {
            const valA = a.analytics[this.state.sort.key] || 0;
            const valB = b.analytics[this.state.sort.key] || 0;
            return this.state.sort.dir === 'desc' ? valB - valA : valA - valB;
        });

        container.innerHTML = filtered.map(p => `
            <tr onclick="window.location.hash='#/player/${p.id}'" style="cursor:pointer">
                <td>
                    <div style="font-weight: 700;">${p.name} ${p.nationality === 'Overseas' ? '<span class="badge-ovs">OS</span>' : ''}</div>
                    <div class="mono" style="font-size: 9px; color: var(--gold);">${p.analytics.archetype}</div>
                </td>
                <td class="mono">${p.ipl2026Team}</td>
                <td class="mono" style="font-size: 11px;">${p.role}</td>
                <td class="mono">₹${p.ipl2026Price || '0'} Cr</td>
                <td class="display" style="color:var(--gold); font-size: 20px;">${p.analytics.overallRating}</td>
            </tr>
        `).join('');

        if (filtered.length === 0) {
            container.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 100px; color: var(--warm-gray);">No players found matching your filters.</td></tr>`;
        }
    },

    getProfileTemplate(p) {
        const b = p.batting?.ipl2025 || {};
        const bowl = p.bowling?.ipl2025 || {};
        const form = p.batting?.recentForm || [];

        const getPhaseBars = () => {
            if (p.role.includes('Batter')) {
                return `
                    <div class="phase-row"><div class="lbl mono">POWERPLAY SR <span>${b.powerplaySR || '-'}</span></div><div class="bar-track"><div class="bar-fill" style="width:${(b.powerplaySR / 2.2) || 0}%;"></div></div></div>
                    <div class="phase-row"><div class="lbl mono">MIDDLE OVERS SR <span>${b.middleOversSR || '-'}</span></div><div class="bar-track"><div class="bar-fill" style="width:${(b.middleOversSR / 2.2) || 0}%;"></div></div></div>
                    <div class="phase-row"><div class="lbl mono">DEATH OVERS SR <span>${b.deathOversSR || '-'}</span></div><div class="bar-track"><div class="bar-fill" style="width:${(b.deathOversSR / 2.2) || 0}%;"></div></div></div>
                `;
            }
            return `
                <div class="phase-row"><div class="lbl mono">POWERPLAY ECON <span>${bowl.powerplayEconomy || '-'}</span></div><div class="bar-track"><div class="bar-fill" style="width:${100 - (bowl.powerplayEconomy * 8)}%;"></div></div></div>
                <div class="phase-row"><div class="lbl mono">MIDDLE OVERS ECON <span>${bowl.middleOversEconomy || '-'}</span></div><div class="bar-track"><div class="bar-fill" style="width:${100 - (bowl.middleOversEconomy * 8)}%;"></div></div></div>
                <div class="phase-row"><div class="lbl mono">DEATH OVERS ECON <span>${bowl.deathOversEconomy || '-'}</span></div><div class="bar-track"><div class="bar-fill" style="width:${100 - (bowl.deathOversEconomy * 8)}%;"></div></div></div>
            `;
        };

        return `
            <div class="profile-page">
                <div class="profile-header">
                    <div class="eyebrow mono">— Professional Scouting Dossier</div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid var(--ink); padding-bottom: 20px;">
                        <div>
                            <h1 class="display" style="font-size: clamp(48px, 8vw, 100px);">${p.name}</h1>
                            <div class="mono" style="color:var(--gold); font-size: 14px;">${p.role} | ${p.ipl2026Team} | ${p.nationality} | AGE ${p.age}</div>
                        </div>
                        <div style="text-align: right;">
                            <div class="display" style="font-size: 60px; color: var(--gold); line-height: 1;">${p.analytics.overallRating}</div>
                            <div class="mono" style="font-size: 10px;">OVERALL SCORE</div>
                        </div>
                    </div>
                </div>

                <div class="grid" style="grid-template-columns: repeat(4, 1fr); margin: 40px 0;">
                    <div class="score-box"><span class="lbl">IPL 2025 ${p.role.includes('Batter') ? 'RUNS' : 'WKTS'}</span><span class="val">${b.runs || bowl.wickets || '0'}</span></div>
                    <div class="score-box"><span class="lbl">AVERAGE</span><span class="val">${b.avg || bowl.avg || 'N/A'}</span></div>
                    <div class="score-box"><span class="lbl">${p.role.includes('Batter') ? 'STRIKE RATE' : 'ECONOMY'}</span><span class="val">${b.sr || bowl.economy || 'N/A'}</span></div>
                    <div class="score-box"><span class="lbl">IMPACT SCORE</span><span class="val">${p.analytics.impactScore}</span></div>
                </div>

                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 60px;">
                    <div>
                        <h3 class="mono" style="margin-bottom: 30px; border-bottom: 1px solid var(--border); padding-bottom: 10px;">Phase-by-Phase Performance</h3>
                        <div class="phase-bars">${getPhaseBars()}</div>
                        
                        <h3 class="mono" style="margin-top: 50px; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 10px;">Recent Form</h3>
                        <div style="display: flex; gap: 10px;">
                            ${form.length ? form.map(s => `<div class="score-pill mono ${s >= 50 ? 'high' : s >= 30 ? 'mid' : 'low'}">${s}</div>`).join('') : '<span class="mono">No data</span>'}
                        </div>
                    </div>
                    <div>
                        <div class="scout-verdict" style="background:var(--ink); color:white; padding:40px; position: relative;">
                            <div class="eyebrow mono" style="color:var(--gold)">— Intelligence Verdict</div>
                            <p style="font-size: 20px; font-style: italic; line-height: 1.4; margin-top: 20px;">"${p.analytics.scoutVerdict}"</p>
                            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                                <div class="mono" style="font-size: 11px; color: var(--gold);">ARCHETYPE: ${p.analytics.archetype}</div>
                                <div class="mono" style="font-size: 11px; margin-top: 5px;">PEER RANK: #${p.analytics.peerRank}</div>
                                <div class="mono" style="font-size: 11px; margin-top: 5px;">ADVISED CEILING: ₹${p.analytics.auctionCeiling} CR</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // --- BUILDER LOGIC ---

    initBuilder() {
        this.renderPool();
        this.renderSquad();
        this.validateSquad();

        document.getElementById('pool-search').addEventListener('input', (e) => {
            this.renderPool(e.target.value);
        });
    },

    renderPool(search = '') {
        const container = document.getElementById('player-pool');
        const pool = this.state.players.filter(p =>
            !this.state.squad.includes(p.id) &&
            p.name.toLowerCase().includes(search.toLowerCase())
        );

        container.innerHTML = pool.map(p => `
            <div class="pool-item" onclick="App.addToSquad('${p.id}')">
                <div class="mono" style="font-size: 10px;">${p.role}</div>
                <div>${p.name} ${p.nationality === 'Overseas' ? '⭐' : ''}</div>
                <div class="mono" style="font-size: 9px; opacity: 0.6;">Rating: ${p.analytics.overallRating}</div>
            </div>
        `).join('');
    },

    renderSquad() {
        const container = document.getElementById('squad-slots');
        const emptySlots = 12 - this.state.squad.length;

        let html = this.state.squad.map((id, idx) => {
            const p = this.state.players.find(pl => pl.id === id);
            return `
                <div class="squad-card" onclick="App.removeFromSquad('${id}')">
                    <div class="mono pos">#${idx + 1}</div>
                    <div class="name">${p.shortName}</div>
                    <div class="mono role">${p.role}</div>
                </div>
            `;
        }).join('');

        for (let i = 0; i < emptySlots; i++) {
            html += `<div class="squad-card empty mono">Empty Slot</div>`;
        }

        container.innerHTML = html;
        this.updateBalanceScorecard();
    },

    addToSquad(id) {
        if (this.state.squad.length >= 12) return alert("Squad full (Max 12 including Impact Sub)");
        this.state.squad.push(id);
        this.renderPool(document.getElementById('pool-search').value);
        this.renderSquad();
        this.validateSquad();
    },

    removeFromSquad(id) {
        this.state.squad = this.state.squad.filter(sid => sid !== id);
        this.renderPool(document.getElementById('pool-search').value);
        this.renderSquad();
        this.validateSquad();
    },

    validateSquad() {
        const container = document.getElementById('squad-validation');
        const players = this.state.squad.map(id => this.state.players.find(p => p.id === id));

        const ovs = players.filter(p => p.nationality === 'Overseas').length;
        const wks = players.filter(p => p.role === 'Wicketkeeper-Batter').length;
        const bowls = players.filter(p => p.role === 'Bowler' || p.role === 'All-rounder').length;

        const rules = [
            { ok: ovs <= 4, msg: `${ovs}/4 Overseas Players`, crit: true },
            { ok: wks >= 1, msg: `Wicketkeeper Selected`, crit: true },
            { ok: bowls >= 5, msg: `${bowls}/5 Bowling Options`, crit: true }
        ];

        container.innerHTML = rules.map(r => `
            <span class="rule-tag ${r.ok ? 'pass' : 'fail'}">${r.msg}</span>
        `).join('');
    },

    updateBalanceScorecard() {
        const stats = document.getElementById('balance-stats');
        const players = this.state.squad.map(id => this.state.players.find(p => p.id === id));

        const calculate = (role) => {
            const group = players.filter(p => p.role.includes(role));
            if (!group.length) return 0;
            return (group.reduce((acc, p) => acc + p.analytics.overallRating, 0) / group.length).toFixed(1);
        };

        stats.innerHTML = `
            <div class="score-box small"><span class="lbl">BATTING</span><span class="val">${calculate('Batter')}</span></div>
            <div class="score-box small"><span class="lbl">BOWLING</span><span class="val">${calculate('Bowler')}</span></div>
            <div class="score-box small"><span class="lbl">FIELDING</span><span class="val">${calculate('Fielding') || '8.2'}</span></div>
            <div class="score-box small"><span class="lbl">OVERALL</span><span class="val">${calculate('')}</span></div>
        `;
    },

    generateReport() {
        const players = this.state.squad.map(id => this.state.players.find(p => p.id === id));
        if (players.length < 11) return alert("Select at least 11 players for a valid report.");

        let report = `INTELLIGENCE REPORT: SELECTED playing 12\n\n`;
        players.forEach((p, idx) => {
            report += `${idx + 1}. ${p.name} (${p.role}) - Rating: ${p.analytics.overallRating}\n`;
        });

        alert("Report Generated (Simulated PDF download):\n\n" + report);
    },

    initTicker() {
        // Update ticker with real data
        const topRun = this.state.players.sort((a, b) => (b.batting?.ipl2025?.runs || 0) - (a.batting?.ipl2025?.runs || 0))[0];
        const topWkt = this.state.players.sort((a, b) => (b.bowling?.ipl2025?.wickets || 0) - (a.bowling?.ipl2025?.wickets || 0))[0];

        const ticker = document.querySelector('.ticker');
        if (!ticker) return;

        const items = [
            topRun ? `🟢 ${topRun.name.toUpperCase()} — ORANGE CAP '25: ${topRun.batting?.ipl2025?.runs || 0} RUNS` : '🟢 LOADING ORANGE CAP DATA...',
            topWkt ? `🟣 ${topWkt.name.toUpperCase()} — PURPLE CAP '25: ${topWkt.bowling?.ipl2025?.wickets || 0} WKTS` : '🟣 LOADING PURPLE CAP DATA...',
            `🟡 AUCTION RECORD — RISHABH PANT: ₹27.0 CR (LSG)`,
            `🟢 CAMERON GREEN — HIGHEST OVS BID: ₹25.2 CR`,
            `🟠 SHREYAS IYER — PBKS RECORD: ₹26.75 CR`
        ];

        ticker.innerHTML = items.map(text => `<div class="ticker-item">${text}</div>`).concat(items.map(text => `<div class="ticker-item">${text}</div>`)).join('');
    },

    initRevealObserver() {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
