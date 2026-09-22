const courses=[
{id:'onboarding',day:'08',month:'OCT',cat:'입문',title:'SFG 신규입문교육',target:'신규 입사자',place:'고삼연수원',status:'예정',desc:'SFG의 철학과 조직을 이해하고 현장 적응을 돕는 입문 과정입니다.'},
{id:'manager',day:'15',month:'OCT',cat:'리더십',title:'점장 역량 강화 과정',target:'점장',place:'고삼연수원',status:'예정',desc:'운영·손익·서비스·사람관리 역량을 강화하는 점장 과정입니다.'},
{id:'academy',day:'22',month:'OCT',cat:'핵심인재',title:'SFG 사관학교',target:'관리자·핵심인재',place:'고삼연수원',status:'준비중',desc:'SFG 핵심인재와 리더를 육성하는 심화 과정입니다.'},
{id:'mandatory',day:'01–30',month:'NOV',cat:'필수',title:'2026 법정의무교육',target:'전 임직원',place:'온라인',status:'예정',desc:'11월 중 전 임직원이 반드시 이수해야 하는 법정 필수교육입니다.'}
];
const programs=[
{no:'01',title:'입문교육',desc:'SFG를 이해하고 빠르게 적응하기 위한 기본과정',list:['회사·브랜드 이해','기본수칙','서비스 기본']},
{no:'02',title:'리더십교육',desc:'점장·조리장 등 현장 리더의 역할과 관리역량 강화',list:['사람관리','운영관리','문제해결']},
{no:'03',title:'서비스교육',desc:'고객 경험을 높이기 위한 현장 서비스 역량 강화',list:['고객맞이','VOC','상황별 응대']},
{no:'04',title:'직무교육',desc:'직무별 전문성과 현장 업무수행 역량 강화',list:['POS','원가','위생·청결']},
{no:'05',title:'핵심인재',desc:'미래 리더를 위한 차세대 인재육성 과정',list:['사관학교','리더십','경영이해']}
];
const targets={
'점장':{desc:'매출·사람·운영·서비스를 총괄하는 현장 책임자',items:[['필수','점장 역량 강화','운영·손익·사람관리'],['추천','VOC Service Recovery','고객 불만 대응'],['추천','원가관리','재료비·로스·인건비']]},
'스탭':{desc:'고객 접점 서비스와 기본 직무를 수행하는 현장 구성원',items:[['필수','신규입문교육','SFG 기본 이해'],['추천','서비스 기본','고객맞이·메뉴서브'],['필수','법정의무교육','온라인 필수']]},
'조리장':{desc:'품질·원가·위생·인력을 관리하는 주방 리더',items:[['필수','조리장 역할','주방 운영·직원교육'],['필수','위생관리','식중독·교차오염 예방'],['추천','원가관리','포션·로스 관리']]},
'본사':{desc:'사업과 현장을 지원하는 본사 구성원',items:[['필수','신규입문교육','SFG 이해'],['추천','직무교육','직무 전문성'],['필수','법정의무교육','온라인 필수']]}
};
const paths=[
{role:'점장',steps:['운영 기본','원가·손익','서비스·VOC','사람관리']},
{role:'스탭',steps:['입문','서비스 기본','직무 숙련','차세대 리더']},
{role:'조리장',steps:['주방 기본','위생·안전','원가관리','직원교육']},
{role:'본사',steps:['온보딩','직무 전문성','협업·소통','리더십']}
];
const skills=[
['S','Service','고객 경험을 만드는 서비스 역량'],
['O','Operation','현장을 안정적으로 운영하는 역량'],
['L','Leadership','방향을 제시하고 실행을 이끄는 역량'],
['P','People','사람을 성장시키는 관리 역량'],
['E','Expertise','직무 전문성을 높이는 역량'],
['V','VOC','불만을 신뢰로 바꾸는 서비스 회복 역량']
];
const faqs=[
['교육 대상 여부는 어디서 확인하나요?','교육 일정 또는 대상별 교육 영역에서 본인의 직무와 대상 여부를 확인할 수 있습니다.'],
['교육 신청은 어떻게 하나요?','과정별 상세 안내에서 신청 방법을 확인합니다. 신청 링크는 실제 운영 방식에 맞춰 연결할 수 있습니다.'],
['법정의무교육은 언제까지 들어야 하나요?','과정별 안내된 수강기간 내 이수해야 하며, 미이수자는 별도 안내될 수 있습니다.'],
['점장 교육은 어떤 내용으로 구성되나요?','운영, 손익, 서비스, 사람관리 등 현장 책임자에게 필요한 핵심 역량 중심으로 구성됩니다.']
];
let courseFilter='전체', target='점장';

function init(){
 renderFilters();renderCourses();renderPrograms();renderTargetTabs();renderTarget();renderPaths();renderSkills();renderFaq();
}
function renderFilters(){const fs=['전체','입문','리더십','핵심인재','필수'];document.getElementById('courseFilters').innerHTML=fs.map(f=>`<button class="filter ${f===courseFilter?'active':''}" onclick="setFilter('${f}')">${f}</button>`).join('')}
function setFilter(f){courseFilter=f;renderFilters();renderCourses()}
function renderCourses(){const list=courses.filter(c=>courseFilter==='전체'||c.cat===courseFilter);document.getElementById('courseTable').innerHTML=list.map(c=>`<div class="course-row"><div class="course-date"><strong>${c.day}</strong><span>${c.month}</span></div><div class="course-main"><small>${c.cat}</small><h3>${c.title}</h3><p>${c.target}</p></div><div class="course-meta">${c.place}</div><span class="status">${c.status}</span><button onclick="openCourse('${c.id}')">상세 →</button></div>`).join('')}
function renderPrograms(){document.getElementById('programGrid').innerHTML=programs.map(p=>`<article class="program-card"><span>${p.no}</span><h3>${p.title}</h3><p>${p.desc}</p><ul>${p.list.map(x=>`<li>${x}</li>`).join('')}</ul><button onclick="scrollToId('targets')">대상별 보기 →</button></article>`).join('')}
function renderTargetTabs(){document.getElementById('targetTabs').innerHTML=Object.keys(targets).map(t=>`<button class="target-tab ${t===target?'active':''}" onclick="selectTarget('${t}')">${t}</button>`).join('')}
function selectTarget(t){target=t;renderTargetTabs();renderTarget()}
function renderTarget(){const x=targets[target];document.getElementById('targetPanel').innerHTML=`<div class="target-intro"><p class="eyebrow">AUDIENCE</p><h3>${target}</h3><p>${x.desc}</p></div><div class="target-list"><h4>추천 교육</h4>${x.items.map(i=>`<div class="target-course"><span>${i[0]}</span><strong>${i[1]}</strong><b>${i[2]}</b></div>`).join('')}</div>`}
function renderPaths(){document.getElementById('pathGrid').innerHTML=paths.map(p=>`<article class="path-card"><span>LEARNING PATH</span><h3>${p.role}</h3><ol>${p.steps.map(x=>`<li>${x}</li>`).join('')}</ol></article>`).join('')}
function renderSkills(){document.getElementById('skillsGrid').innerHTML=skills.map(s=>`<article class="skill-card"><b>${s[0]}</b><span>${s[1]}</span><p>${s[2]}</p></article>`).join('')}
function renderFaq(){document.getElementById('faqList').innerHTML=faqs.map((f,i)=>`<div class="faq-item"><button class="faq-q" onclick="toggleFaq(${i})"><span>${f[0]}</span><b>+</b></button><div class="faq-a">${f[1]}</div></div>`).join('')}
function toggleFaq(i){document.querySelectorAll('.faq-item')[i].classList.toggle('open')}
function openCourse(id){const c=courses.find(x=>x.id===id);document.getElementById('modalType').textContent=c.cat;document.getElementById('modalTitle').textContent=c.title;document.getElementById('modalDesc').textContent=c.desc;document.getElementById('modalBody').innerHTML=`<div class="modal-info"><div><small>대상</small><b>${c.target}</b></div><div><small>일정</small><b>${c.month} ${c.day}</b></div><div><small>장소</small><b>${c.place}</b></div><div><small>상태</small><b>${c.status}</b></div></div>`;document.getElementById('modal').classList.add('show')}
function closeModal(){document.getElementById('modal').classList.remove('show')}
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()})
function scrollToId(id){document.getElementById(id).scrollIntoView({behavior:'smooth'})}
init();
