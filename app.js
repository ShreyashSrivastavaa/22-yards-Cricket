/**
 * 22 YARDS CRICKET - APP CONTROLLER
 * SPA Hash Routing & View Management
 */

const _supabase = window.supabase.createClient(
    'https://qyeqhlmmkdtcfgwcvoix.supabase.co',
    'sb_publishable_cZU1vO06YigqVx1yYa_xTg_h983sPNr'
);

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
        sort: { key: 'overallRating', dir: 'desc' },
        user: null,
        builder: {
            step: 1,
            selectedTeam: null,
            playing12: Array(12).fill(null),
            impactSub: null,
            pool: []
        }
    },

    async init() {
        if (typeof players === 'undefined') {
            console.error('CRITICAL: players variable is undefined. Check if players.js is loading correctly.');
        }
        this.state.players = typeof players !== 'undefined' ? players : [];
        window.addEventListener('hashchange', () => this.handleRoute());

        const { data: { session } } = await _supabase.auth.getSession();
        if (session) {
            const username = session.user.user_metadata?.username || session.user.email;
            this.state.user = { username };
        }

        // Supabase Auth Listener
        _supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                const username = session.user.user_metadata.username || session.user.email;
                this.state.user = { username };
            } else {
                this.state.user = null;
            }
            this.updateAuthNav();
        });

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
            if (!this.state.user) {
                alert('Sign in to access the Playing 12 Builder');
                window.location.hash = '#/login';
                return;
            }
            this.renderBuilder();
        } else if (hash.startsWith('#/team/')) {
            const team = hash.split('/team/')[1];
            this.renderTeamPage(team);
        } else if (hash === '#/login' || hash === '#/register') {
            this.renderAuth(hash === '#/register');
        }

        this.updateAuthNav();
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
        this.showView('builder-view');
        this.moveBuilderStep(this.state.builder.step);
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

    moveBuilderStep(step) {
        this.state.builder.step = step;

        document.querySelectorAll('.step-indicator').forEach((el, idx) => {
            const stepNum = idx + 1;
            el.classList.toggle('active', stepNum === step);
            el.classList.toggle('done', stepNum < step);
        });

        document.querySelectorAll('.builder-step').forEach(el => el.style.display = 'none');
        const stepEl = document.getElementById(`builder-step-${step}`);
        if (stepEl) stepEl.style.display = 'block';

        if (step === 1) this.renderBuilderStep1();
        if (step === 2) this.renderBuilderStep2();
        if (step === 3) this.renderBuilderStep3();
        if (step === 4) this.renderBuilderStep4();
    },

    renderBuilderStep1() {
        const grid = document.getElementById('builder-team-grid');
        if (!grid) return;
        const teams = [
            { id: 'MI', name: 'Mumbai Indians', color: '#004BA0' },
            { id: 'CSK', name: 'Chennai Super Kings', color: '#F5A623' },
            { id: 'RCB', name: 'Royal Challengers Bengaluru', color: '#C0392B' },
            { id: 'KKR', name: 'Kolkata Knight Riders', color: '#3A1F6E' },
            { id: 'DC', name: 'Delhi Capitals', color: '#004C93' },
            { id: 'PBKS', name: 'Punjab Kings', color: '#ED1C24' },
            { id: 'RR', name: 'Rajasthan Royals', color: '#FF69B4' },
            { id: 'SRH', name: 'Sunrisers Hyderabad', color: '#F26522' },
            { id: 'GT', name: 'Gujarat Titans', color: '#1C3A6B' },
            { id: 'LSG', name: 'Lucknow Super Giants', color: '#00B4D8' }
        ];

        grid.innerHTML = teams.map(t => {
            const squad = this.state.players.filter(p => p.ipl2026Team === t.id);
            const ovsCount = squad.filter(p => p.nationality === 'Overseas').length;
            return `
                <div class="builder-team-card" style="border-left: 4px solid ${t.color};" onclick="App.selectBuilderTeam('${t.id}')">
                    <div class="abbr" style="color:${t.color}">${t.id}</div>
                    <h3 style="font-family: 'Bebas Neue';">${t.name}</h3>
                    <div class="meta mono">
                        <div>SQUAD: ${squad.length} PLAYERS</div>
                        <div>OVERSEAS: ${ovsCount}/8 AVAIL.</div>
                    </div>
                </div>
            `;
        }).join('');
    },

    selectBuilderTeam(teamId) {
        this.state.builder.selectedTeam = teamId;
        this.state.builder.pool = this.state.players.filter(p => p.ipl2026Team === teamId);
        this.state.builder.playing12 = Array(12).fill(null);
        this.state.builder.impactSub = null;
        this.moveBuilderStep(2);
    },

    renderBuilderStep2() {
        const team = this.state.builder.selectedTeam;
        const squad = this.state.builder.pool;
        const ovsCount = squad.filter(p => p.nationality === 'Overseas').length;

        const header = document.getElementById('squad-review-header');
        if (header) {
            header.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom: 2px solid var(--ink); padding-bottom: 20px;">
                    <div>
                        <div class="eyebrow mono">— Selected Franchise</div>
                        <h1 class="display" style="font-size: 60px;">${team} SQUAD</h1>
                    </div>
                    <div style="text-align: right;">
                        <button class="btn btn-ghost" onclick="App.moveBuilderStep(1)">Change Team</button>
                        <div class="mono" style="font-size: 11px; margin-top: 10px;">${squad.length} PLAYERS | ${ovsCount} OVERSEAS AVAILABLE</div>
                    </div>
                </div>
            `;
        }

        const list = document.getElementById('squad-review-list');
        if (list) {
            const roles = ['WK-Batter', 'Batter', 'All-rounder', 'Bowler'];
            list.innerHTML = roles.map(role => {
                const players = squad.filter(p => p.role === role);
                if (!players.length) return '';
                return `
                    <div style="margin-bottom: 40px;">
                        <h3 class="mono" style="font-size: 12px; border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 15px;">${role.toUpperCase()}S</h3>
                        <div class="grid" style="grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            ${players.map(p => `
                                <div class="pool-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: white;">
                                    <div>
                                        <div style="font-weight: 700;">${p.name} ${p.nationality === 'Overseas' ? '<span class="badge-ovs" style="background:var(--gold); color:var(--ink); font-size:8px; padding:1px 4px; margin-left:5px;">OVS</span>' : ''}</div>
                                        <div class="mono" style="font-size: 9px; opacity: 0.6;">${p.battingHand} | ${p.bowlingStyle || 'Non-bowler'}</div>
                                    </div>
                                    <div class="display" style="color:var(--gold); font-size: 20px;">${p.analytics.overallRating}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        }
    },

    renderBuilderStep3() {
        this.updateBuilderPool();
        this.updateBuilderSlots();
        this.validateRules();
    },

    updateBuilderPool() {
        const container = document.getElementById('builder-pool-list');
        if (!container) return;
        const roles = ['WK-Batter', 'Batter', 'All-rounder', 'Bowler'];
        const selectedIds = this.state.builder.playing12.filter(p => p).map(p => p.id);
        if (this.state.builder.impactSub) selectedIds.push(this.state.builder.impactSub.id);

        const search = document.getElementById('pool-search')?.value.toLowerCase() || '';

        container.innerHTML = roles.map(role => {
            const players = this.state.builder.pool.filter(p =>
                p.role === role && p.name.toLowerCase().includes(search)
            );
            if (!players.length) return '';
            return `
                <div style="margin-bottom: 30px;">
                    <div class="mono" style="font-size: 10px; margin-bottom: 10px; color: var(--gold); border-bottom: 1px solid var(--border);">${role.toUpperCase()}S</div>
                    ${players.map(p => {
                const isSelected = selectedIds.includes(p.id);
                return `
                            <div class="pool-item ${isSelected ? 'selected' : ''}" 
                                 onclick="${isSelected ? '' : `App.addPlayerToXI('${p.id}')`}" 
                                 style="padding: 10px; font-size: 13px; display: flex; justify-content: space-between; cursor: ${isSelected ? 'default' : 'pointer'}; opacity: ${isSelected ? 0.3 : 1}">
                                <span>${p.name} ${p.nationality === 'Overseas' ? '⭐' : ''}</span>
                                <span class="mono" style="font-size: 10px;">${p.analytics.overallRating}</span>
                            </div>
                        `;
            }).join('')}
                </div>
            `;
        }).join('');
    },

    updateBuilderSlots() {
        const container = document.getElementById('playing-12-slots');
        if (!container) return;
        const labels = [
            "Opener", "Opener", "No.3", "Middle Order", "Middle Order", "Finisher",
            "All-rounder", "All-rounder / Lower Order", "Bowler", "Bowler", "Bowler", "Bowler"
        ];

        let html = this.state.builder.playing12.map((p, i) => `
            <div class="player-slot" onclick="${p ? `App.removePlayerFromXI(${i})` : ''}">
                <div class="slot-num">${i + 1}</div>
                <div style="flex:1">
                    <div class="slot-label">${labels[i]}</div>
                    <div style="font-weight: 700; font-size: 15px;">${p ? p.name : '<span style="opacity:0.2">Empty Slot</span>'}</div>
                </div>
                ${p ? `<div class="display" style="color:var(--gold)">${p.analytics.overallRating}</div>` : ''}
            </div>
        `).join('');

        const sub = this.state.builder.impactSub;
        html += `
            <div class="player-slot" style="grid-column: span 2; border-style: dashed; background: var(--parchment);" onclick="${sub ? `App.removePlayerFromXI(-1)` : ''}">
                <div class="slot-num" style="font-size: 14px; width: auto; margin-right: 15px;">SUB</div>
                <div style="flex:1">
                    <div class="slot-label">Impact Substitute</div>
                    <div style="font-weight: 700; font-size: 15px;">${sub ? sub.name : '<span style="opacity:0.2">Assign Sub...</span>'}</div>
                </div>
                ${sub ? `<div class="display" style="color:var(--gold)">${sub.analytics.overallRating}</div>` : ''}
            </div>
        `;

        container.innerHTML = html;
        this.updatePreviews();
    },

    addPlayerToXI(id) {
        const p = this.state.players.find(pl => pl.id === id);
        const slots = this.state.builder.playing12;
        const emptyIdx = slots.findIndex(s => s === null);

        if (emptyIdx !== -1) {
            slots[emptyIdx] = p;
        } else if (!this.state.builder.impactSub) {
            this.state.builder.impactSub = p;
        } else {
            alert("Playing 12 + Impact Sub already full.");
            return;
        }
        this.renderBuilderStep3();
    },

    removePlayerFromXI(idx) {
        if (idx === -1) {
            this.state.builder.impactSub = null;
        } else {
            this.state.builder.playing12[idx] = null;
        }
        this.renderBuilderStep3();
    },

    validateRules() {
        const players = this.state.builder.playing12.filter(p => p);
        const sub = this.state.builder.impactSub;
        const all = sub ? [...players, sub] : players;

        const ovs = players.filter(p => p.nationality === 'Overseas').length;
        const wks = all.filter(p => p.role === 'WK-Batter').length;
        const top6Batters = all.filter(p => p.role.includes('Batter') || p.role === 'All-rounder').length;
        const bowlers = all.filter(p => p.role === 'Bowler' || p.role === 'All-rounder').length;
        const spinners = all.filter(p => p.bowlingStyle?.toLowerCase().includes('spin')).length;
        const indians = all.filter(p => p.nationality === 'Indian').length;

        const rules = [
            { id: 'ovs', ok: ovs <= 4, label: `Max 4 Overseas (${ovs}/4)` },
            { id: 'wk', ok: wks >= 1, label: `At least 1 Wicketkeeper` },
            { id: 'bat', ok: top6Batters >= 5, label: `Min 5 Batting Options` },
            { id: 'bowl', ok: bowlers >= 5, label: `Min 5 Bowling Options` },
            { id: 'spin', ok: spinners >= 1, label: `Min 1 Specialist Spinner` },
            { id: 'ind', ok: indians >= 7, label: `Min 7 Indian Players` }
        ];

        const container = document.getElementById('rules-list');
        if (container) {
            container.innerHTML = rules.map(r => `
                <div class="rule-item ${r.ok ? 'valid' : 'invalid'}">
                    <i class="mono">${r.ok ? '●' : '○'}</i>
                    <span>${r.label}</span>
                </div>
            `).join('');
        }

        const isValid = rules.every(r => r.ok) && players.length === 12;
        const btn = document.getElementById('generate-report-btn');
        if (btn) btn.disabled = !isValid;

        this.updateBalanceScorecard(all);
    },

    updateBalanceScorecard(players) {
        const stats = document.getElementById('balance-scorecard');
        if (!stats) return;
        if (!players.length) { stats.innerHTML = ''; return; }

        const avg = (players.reduce((acc, p) => acc + p.analytics.overallRating, 0) / players.length).toFixed(1);

        stats.innerHTML = `
            <div class="scout-verdict" style="background:var(--ink); color:white; padding:20px;">
                <div class="mono" style="font-size:10px; color:var(--gold);">SQUAD DEPTH ANALYSIS</div>
                <div class="display" style="font-size:40px; margin:10px 0;">${avg}</div>
                <div class="mono" style="font-size:9px; opacity:0.6;">Weighted Intelligence Score</div>
            </div>
        `;
    },

    updatePreviews() {
        const batting = document.getElementById('batting-order-preview');
        const bowling = document.getElementById('bowling-plan-preview');
        if (!batting || !bowling) return;

        const players = this.state.builder.playing12.filter(p => p);

        if (!players.length) {
            batting.innerHTML = '<div class="mono" style="font-size:10px; opacity:0.3">Batting order will appear here...</div>';
            bowling.innerHTML = '<div class="mono" style="font-size:10px; opacity:0.3">Bowling plan will appear here...</div>';
            return;
        }

        batting.innerHTML = `
            <div class="mono" style="font-size:11px; margin-bottom:10px;">PROJECTED BATTING ORDER</div>
            <div style="font-size:12px; line-height:1.6;">
                ${players.map((p, i) => `<div>${i + 1}. ${p.shortName} <span class="mono" style="font-size:9px; opacity:0.6">${p.role}</span></div>`).join('')}
            </div>
        `;

        const bowlPool = players.filter(p => p.role === 'Bowler' || p.role === 'All-rounder');
        bowling.innerHTML = `
            <div class="mono" style="font-size:11px; margin-bottom:10px;">STRATEGIC BOWLING PLAN</div>
            <div style="font-size:11px; line-height:1.8;">
                <div style="border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:5px;">
                    <b>Powerplay (1-6):</b> ${bowlPool.slice(0, 2).map(p => p.shortName).join(', ') || 'TBD'}
                </div>
                <div>
                    <b>Middle (7-15):</b> ${bowlPool.slice(2, 4).map(p => p.shortName).join(', ') || 'TBD'}
                </div>
                <div style="border-top:1px solid var(--border); padding-top:5px; margin-top:5px;">
                    <b>Death (16-20):</b> ${bowlPool.slice(0, 1).concat(bowlPool.slice(4, 5)).map(p => p.shortName).join(', ') || 'TBD'}
                </div>
            </div>
        `;
    },

    renderBuilderStep4() {
        const container = document.getElementById('final-report-content');
        if (!container) return;
        const team = this.state.builder.selectedTeam;
        const players = this.state.builder.playing12.filter(p => p);
        const sub = this.state.builder.impactSub;

        container.innerHTML = `
            <div class="report-header" style="text-align:center; padding-bottom:30px; border-bottom:2px solid var(--ink); margin-bottom:40px;">
                <div class="eyebrow mono" style="color:var(--gold)">CONFIDENTIAL STRATEGY REPORT</div>
                <h1 class="display" style="font-size: 60px;">${team} PLAYING 12</h1>
                <div class="mono" style="font-size: 11px;">Built on 22 Yards Cricket · IPL 2026 Intelligence</div>
            </div>
            
            <table style="width:100%; border-collapse: collapse; margin-top: 30px;">
                <tr class="mono" style="background:var(--parchment); font-size: 10px; text-align:left;">
                    <th style="padding:10px;">POS</th>
                    <th style="padding:10px;">PLAYER</th>
                    <th style="padding:10px;">ROLE</th>
                    <th style="padding:10px;">RATING</th>
                </tr>
                ${players.map((p, i) => `
                    <tr style="border-bottom: 1px solid var(--border); font-size: 14px;">
                        <td class="mono" style="padding:10px;">${i + 1}</td>
                        <td style="padding:10px; font-weight:700;">${p.name} ${p.nationality === 'Overseas' ? '⭐' : ''}</td>
                        <td class="mono" style="padding:10px; font-size:11px;">${p.role}</td>
                        <td class="display" style="padding:10px; color:var(--gold);">${p.analytics.overallRating}</td>
                    </tr>
                `).join('')}
                <tr style="background:var(--ink); color:white;">
                    <td class="mono" style="padding:10px;">SUB</td>
                    <td style="padding:10px; font-weight:700;">${sub ? sub.name : 'None'}</td>
                    <td class="mono" style="padding:10px; font-size:11px;">Impact Substitute</td>
                    <td class="display" style="padding:10px; color:var(--gold);">${sub ? sub.analytics.overallRating : '-'}</td>
                </tr>
            </table>

            <div class="scout-verdict" style="margin-top: 40px; background: var(--parchment); border: 1px solid var(--border); padding: 30px;">
                <div class="mono" style="font-size:12px; margin-bottom:15px; border-bottom:1px solid var(--border); padding-bottom:5px;">TACTICAL JUSTIFICATION</div>
                <p class="mono" style="font-size:11px; line-height:1.6; color:var(--ink);">
                    This Playing 12 leverages ${team}'s core strengths. 
                    The balance score of ${(players.reduce((acc, p) => acc + p.analytics.overallRating, 0) / 12).toFixed(1)} indicates a high probability 
                    of playoff qualification based on 22 Yards simulation models.
                </p>
            </div>
        `;
    },

    shareSquad() {
        const team = this.state.builder.selectedTeam;
        const ids = this.state.builder.playing12.filter(p => p).map(p => p.id).join(',');
        const shareUrl = `${window.location.origin}${window.location.pathname}?team=${team}&squad=${ids}#/builder`;

        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("Strategy URL copied to clipboard!");
        });
    },

    filterBuilderPool() {
        this.updateBuilderPool();
    },

    renderAuth(isRegister = false) {
        this.showView('auth-view');
        document.getElementById('login-form').style.display = isRegister ? 'none' : 'block';
        document.getElementById('register-form').style.display = isRegister ? 'block' : 'none';
    },

    updateAuthNav() {
        const container = document.querySelector('.nav-actions') || document.getElementById('nav-auth-btn');
        if (!container) return;

        if (this.state.user) {
            container.innerHTML = `
                <div style="position: relative; display: inline-block;">
                    <div style="color: var(--gold); font-family: 'DM Mono'; font-size: 11px; cursor: pointer; display: flex; align-items: center; gap: 5px;" onclick="document.getElementById('auth-dropdown').style.display = document.getElementById('auth-dropdown').style.display === 'block' ? 'none' : 'block'">
                        ${this.state.user.username} ▼
                    </div>
                    <div id="auth-dropdown" style="display: none; position: absolute; top: 100%; right: 0; background: white; border: 1px solid var(--border); box-shadow: 0 10px 20px rgba(0,0,0,0.1); padding: 10px 0; min-width: 150px; text-align: left; margin-top: 10px;">
                        <a href="#/profile" style="display: block; padding: 10px 20px; color: var(--ink); text-decoration: none; font-family: 'DM Mono'; font-size: 10px;">MY PROFILE</a>
                        <a href="#" onclick="App.logout(); return false;" style="display: block; padding: 10px 20px; color: var(--cricket-red); text-decoration: none; font-family: 'DM Mono'; font-size: 10px;">SIGN OUT</a>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `<a href="#/login" class="btn btn-dark" style="color: var(--parchment);">ACCESS</a>`;
        }
    },

    async handleLogin() {
        const email = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const errDiv = document.getElementById('login-error');
        errDiv.style.display = 'none';

        const { data, error } = await _supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            errDiv.textContent = error.message || 'Authentication Failed';
            errDiv.style.display = 'block';
        } else {
            window.location.hash = '#/';
        }
    },

    async handleRegister() {
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const errDiv = document.getElementById('register-error');
        errDiv.style.display = 'none';

        const { data, error } = await _supabase.auth.signUp({
            email: email,
            password: password,
            options: { data: { username: username } }
        });

        if (error) {
            errDiv.textContent = error.message || 'Registration Failed';
            errDiv.style.display = 'block';
        } else {
            errDiv.style.color = '#4CAF50';
            errDiv.textContent = 'Check your email to confirm your account';
            errDiv.style.display = 'block';
            setTimeout(() => window.location.hash = '#/login', 2000);
        }
    },

    async logout() {
        await _supabase.auth.signOut();
        window.location.hash = '#/';
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

    // --- HELPERS ---

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
