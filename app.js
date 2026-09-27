const insurerCatalog = [
  ['메리츠화재','손해보험'],['한화손해보험','손해보험'],['롯데손해보험','손해보험'],['MG손해보험','손해보험'],['흥국화재','손해보험'],['삼성화재','손해보험'],['현대해상','손해보험'],['KB손해보험','손해보험'],['DB손해보험','손해보험'],['AXA손해보험','손해보험'],['하나손해보험','손해보험'],['AIG손해보험','손해보험'],['에이스손해보험','손해보험'],['카카오페이손해보험','손해보험'],
  ['한화생명','생명보험'],['ABL생명','생명보험'],['삼성생명','생명보험'],['흥국생명','생명보험'],['교보생명','생명보험'],['iM라이프','생명보험'],['미래에셋생명','생명보험'],['KB라이프생명','생명보험'],['신한라이프','생명보험'],['동양생명','생명보험'],['메트라이프생명','생명보험'],['푸본현대생명','생명보험'],['라이나생명','생명보험'],['BNP파리바카디프생명','생명보험'],['처브라이프생명','생명보험'],['AIA생명','생명보험'],['DB생명','생명보험'],['KDB생명','생명보험'],['NH농협생명','생명보험'],['IBK연금보험','생명보험'],['교보라이프플래닛생명','생명보험']
].map(([name,sector])=>({name,sector,status:'약관 미검증'}));
const normalizationRules = [
  {id:'cancer_major',label:'암 주요치료비',aliases:['암주요치료비','일반암주요치료비','암 특정치료비','종합병원 암 특정치료비'],proof:'수술·항암약물·방사선·기타 치료별 지급규칙'},
  {id:'cancer_diagnosis',label:'암 진단비',aliases:['암진단비','일반암진단비','암진단특약'],proof:'일반암·유사암 정의 및 진단 확정 기준'},
  {id:'brain_diagnosis',label:'뇌 진단비',aliases:['뇌혈관질환진단비','뇌졸중진단비','뇌출혈진단비'],proof:'KCD 코드·질병 정의·최초/재진단 기준'},
  {id:'heart_diagnosis',label:'심장 진단비',aliases:['허혈성심장질환진단비','급성심근경색진단비','심장질환진단비'],proof:'KCD 코드·질병 정의·최초/재진단 기준'},
  {id:'circulatory_treatment',label:'뇌·심장 주요치료비',aliases:['순환계질환 주요치료비','2대질환 주요치료비','뇌심장 주요치료비'],proof:'질병별·치료별·통합 지급 및 연간 재지급'},
  {id:'surgery_n',label:'N대 질병수술비',aliases:['112대질병수술비','131대질병수술비','133대질병수술비'],proof:'다빈도 수술별 금액·동일일 중복·재수술 제한'},
  {id:'surgery_1to5',label:'1~5종 수술비',aliases:['1~5종수술비','종수술비','질병수술비'],proof:'수술 분류표·동일일 복수수술·최고액 지급 여부'},
  {id:'care',label:'간병인사용일당',aliases:['간병인사용일당','간병인사용입원일당','간병비지원특약'],proof:'사용시간·실제 결제액·입원/연간 한도·업체 조건'}
];
const sampleData = {
  cancer_major: {
    label: '암 주요치료비', termsDate: '2026.09 (공식 공시 대조 시작)',
    fields: ['보장 범위','지급방식','연간 지급횟수','동일암 재지급','지급기간·총 한도','병원급 조건','면책·감액','핵심 제외조건'],
    products: [
      {company:'롯데손해보험', product:'let:smile 종합건강보험(더채움 베이직) 2609', rider:'종합병원 일반암주요치료비Ⅲ', amount:'세부보장 가입금액의 100%', customerAmount:'치료별 가입금액', quick:'수술·항암약물·방사선·중환자실·재활', values:['수술 · 항암약물 · 방사선 · 중환자실 · 재활','치료별 분리 지급','수술: 매회 / 기타: 각 연 1회 / 재활: 연 10회','원문 세부 재지급 조건 추가 확인 필요','공시 페이지에 별도 총 지급기간 미표시','종합병원','계약일 포함 90일 경과 다음날부터','호르몬 관련 치료제 제외'], rules:['수술: 가입금액의 100% (매회)','항암약물·방사선·중환자실: 각 연 1회','재활: 1일 1회, 연 10회'], total:'가입금액 기준 치료별 지급', limit:'공식 공시 확인 · 2026.09', source:'https://www.lotteins.co.kr/web/C/D/A/cda020.jsp?prdtseq=10367'},
      {company:'삼성화재', product:'다이렉트 건강보험 공식 상품 페이지', rider:'종합병원 암 특정치료비', amount:'가입금액 기준', customerAmount:'통합 가입금액 1회분', quick:'수술·항암약물·방사선', values:['암 직접치료 목적의 수술 · 항암방사선 · 항암약물','담보 통합 지급','연간 1회','원문 세부 재지급 조건 추가 확인 필요','공식 요약 페이지에 별도 총 지급기간 미표시','종합병원','가입 91일 이후 보장','세부 정의·제외는 약관 원문 추가 확인'], rules:['수술·항암약물·방사선을 통합해 연 1회','가입 91일 이후 보장'], total:'가입금액 1회분', limit:'공식 요약 확인 · 약관 원문 대조 진행', source:'https://direct.samsungfire.com/m/mall/MP030202_001.html'},
      {company:'현대해상', product:'두배받는암보험(Hi2607) 판매상품 확인', rider:'암 주요치료비', amount:'원문 검증 대기', customerAmount:'확정 전', quick:'상품·버전 확인 완료', values:['세부 보장 범위 원문 확인 중','지급방식 원문 확인 중','연간 횟수 원문 확인 중','재지급 조건 원문 확인 중','지급기간 원문 확인 중','병원 조건 원문 확인 중','면책·감액 원문 확인 중','공식 약관 원문 확보 후 등록'], rules:['검증 전에는 시나리오 지급액을 계산하지 않음'], total:'검증 보류', limit:'현재 판매상품 확인 · 약관 원문 대조 필요', source:'https://www.hi.co.kr/serviceAction.do?menuId=100950'}
    ],
    scenario: {title:'같은 해 수술 + 항암약물 + 방사선 치료', description:'일반암 진단 뒤 3월 수술, 6월 항암약물, 9월 방사선 치료를 각각 받았다고 가정합니다.', events:[['3월','암수술'],['6월','항암약물'],['9월','항암방사선']]}
  },
  brain_diagnosis: {label:'뇌 진단비',termsDate:'2026.09 (구조 샘플)',fields:['보장 범위','지급방식','연간 지급횟수','동일질병 재지급','지급기간·총 한도','병원급 조건','면책·감액','핵심 제외조건'], products: [
    {company:'샘플 A사',product:'뇌혈관 건강보험 2609',rider:'뇌혈관질환진단비',amount:'1,000만원',customerAmount:'1,000만원',quick:'뇌혈관질환 진단',values:['뇌혈관질환 (약관상 KCD 확인)','진단 확정 1회','최초 1회','동일질병 재지급 없음','보험기간 1회','제한 없음','90일 면책','약관상 제외 질환 확인'],rules:['진단 확정 시 1,000만원'],total:'1,000만원',limit:'최초 1회 지급'},
    {company:'샘플 B사',product:'튼튼순환계보험 2609',rider:'뇌졸중진단비',amount:'1,000만원',customerAmount:'1,000만원',quick:'뇌졸중 진단',values:['뇌졸중 (약관상 KCD 확인)','진단 확정 1회','최초 1회','동일질병 재지급 없음','보험기간 1회','제한 없음','90일 면책','뇌혈관질환 전체와 범위 다름'],rules:['진단 확정 시 1,000만원'],total:'1,000만원',limit:'보장 범위 원문 확인'},
    {company:'샘플 C사',product:'케어플러스 2609',rider:'뇌출혈진단비',amount:'1,000만원',customerAmount:'1,000만원',quick:'뇌출혈 진단',values:['뇌출혈 (약관상 KCD 확인)','진단 확정 1회','최초 1회','동일질병 재지급 없음','보험기간 1회','제한 없음','90일 면책','뇌졸중·뇌혈관과 범위 다름'],rules:['진단 확정 시 1,000만원'],total:'1,000만원',limit:'보장 범위 원문 확인'}], scenario:{title:'동일 뇌혈관 진단 시 지급 비교',description:'각 담보의 정의에 해당하는 진단이 확정되었다고 가정합니다.',events:[['진단일','뇌혈관 관련 진단 확정']]}
  },
  heart_treatment: {label:'심장 주요치료비',termsDate:'2026.09 (구조 샘플)',fields:['보장 범위','지급단위','연간 지급횟수','동일질병 재지급','같은 해 다른질병','지급기간·총 한도','병원급 조건','핵심 제한조건'],products:[],scenario:{title:'심장 치료 시 지급 구조 비교',description:'질병·치료별 또는 통합 지급 여부를 검증하기 위한 시나리오입니다.',events:[['3월','심장 시술'],['8월','심장 수술']]}} ,
  surgery_n: {label:'N대 질병수술비',termsDate:'2026.09 (구조 샘플)',fields:['다빈도 수술','실제 지급금액','동일질병 반복수술','연간 지급횟수','동일일 복수수술','다중 해당 시 지급','재수술 제한','핵심 제외조건'],products:[],scenario:{title:'같은 질병 재수술 시 지급 비교',description:'수술 1회 후 같은 질병으로 재수술을 받았다고 가정합니다.',events:[['3월','1차 수술'],['11월','동일질병 재수술']]}} ,
  surgery_1to5: {label:'1~5종 수술비',termsDate:'2026.09 (구조 샘플)',fields:['1~5종 금액','실제 수술 분류','동일질병 반복','같은 날 복수수술','다중 해당 시 지급','연간 한도','재수술 제한','수술 정의·제외'],products:[],scenario:{title:'같은 날 복수수술 지급 비교',description:'동일일에 2개 수술을 받았을 때 각각 지급인지 최고액 지급인지를 비교합니다.',events:[['수술일','복수 수술 시행']]}} ,
  care: {label:'간병인사용일당',termsDate:'2026.09 (구조 샘플)',fields:['최대 일당','최소 사용시간','결제금액 구간','최대금액 조건','1회 입원·연간 한도','요양병원','간병인·업체 조건','증빙·제외조건'],products:[],scenario:{title:'20일 간병인 사용 시 지급 비교',description:'하루 10시간, 실제 결제 12만원으로 20일 이용했다고 가정합니다.',events:[['입원','간병인 사용 시작'],['20일','퇴원']]}}
};
const category = document.querySelector('#category'), scenarioSelect = document.querySelector('#scenario');
Object.entries(sampleData).forEach(([id,item])=>category.add(new Option(item.label,id)));
function setScenarioOptions(){scenarioSelect.innerHTML='';scenarioSelect.add(new Option(sampleData[category.value].scenario.title,'default'));}
function emptyProducts(item){return [{company:'약관 데이터 입력 대기',product:'실제 보험사·상품·버전을 등록해 비교하세요',rider:item.label,amount:'—',customerAmount:'—',quick:'표준 필드 준비 완료',values:item.fields.map(()=> '실제 약관 입력 필요'),rules:['약관 원문 및 근거 조항을 추가하세요'],total:'—',limit:'샘플 구조 화면'}];}
function render(){const item=sampleData[category.value], products=item.products.length?item.products:emptyProducts(item);document.querySelector('#selectedTitle').textContent=item.label;document.querySelector('#termsDate').textContent=item.termsDate;document.querySelector('#customerTitle').textContent=item.label+' 핵심 비교';
 document.querySelector('#comparisonGrid').innerHTML=products.map(p=>`<article class="coverage-card"><div class="card-top"><div class="company">${p.company}</div><div class="product">${p.product}</div><div class="rider">${p.rider}</div>${p.source?`<a class="source-link" href="${p.source}" target="_blank" rel="noreferrer">공식 근거 보기 ↗</a>`:''}</div><ul class="coverage-list"><li><span>가입금액</span><b>${p.amount}</b></li><li><span>핵심 구조</span><b>${p.quick}</b></li><li><span>중요 제한</span><b>${p.limit}</b></li></ul></article>`).join('');
 document.querySelector('#detailsTable thead').innerHTML=`<tr><th>비교 항목</th>${products.map(p=>`<th>${p.company}<br><small>${p.rider}</small></th>`).join('')}</tr>`;
 document.querySelector('#detailsTable tbody').innerHTML=item.fields.map((f,i)=>`<tr><td>${f}</td>${products.map(p=>`<td>${p.values[i]||'—'}</td>`).join('')}</tr>`).join('');
 document.querySelector('#customerCards').innerHTML=products.map(p=>`<article class="customer-card"><h3>${p.company}</h3><div class="customer-product">${p.rider}</div><div class="customer-amount">${p.customerAmount}</div><div class="customer-item"><span>보장 범위</span><b>${p.quick}</b></div><div class="customer-item"><span>지급 방식</span><b>${p.values[1]}</b></div><div class="customer-item"><span>반복 지급</span><b>${p.values[2]}</b></div><div class="customer-limit"><b>꼭 확인</b> · ${p.limit}</div></article>`).join('');
 document.querySelector('#scenarioTitle').textContent=item.scenario.title;document.querySelector('#scenarioDescription').textContent=item.scenario.description;document.querySelector('#timeline').innerHTML=item.scenario.events.map(e=>`<div class="timeline-event"><i></i><b>${e[0]}</b><span>${e[1]}</span></div>`).join('');document.querySelector('#payoutResults').innerHTML=products.map(p=>`<article class="payout-card"><h3>${p.company}</h3><p>${p.rider}</p><div class="payout-total">${p.total}</div><ul class="payout-rules">${p.rules.map(r=>`<li>${r}</li>`).join('')}</ul></article>`).join('');}
category.addEventListener('change',()=>{setScenarioOptions();render()});document.querySelector('#runScenario').addEventListener('click',()=>document.querySelector('#scenarioSection').scrollIntoView({behavior:'smooth',block:'start'}));
function setMode(mode){document.querySelectorAll('.mode-button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));document.querySelector('#advisorView').hidden=mode!=='advisor';document.querySelector('#customerView').hidden=mode!=='customer';window.scrollTo({top:document.querySelector('.context-row').offsetTop-78,behavior:'smooth'});}
document.querySelectorAll('.mode-button').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));document.querySelector('#showCustomer').addEventListener('click',()=>setMode('customer'));
document.querySelector('#pdfUpload').addEventListener('change',e=>{document.querySelector('#uploadStatus').textContent=e.target.files[0]?`선택한 파일: ${e.target.files[0].name} · 이 샘플 앱에서는 분석하거나 저장하지 않습니다.`:'개인정보는 이 샘플 앱에 저장되지 않습니다.'});
const functionFilter=document.querySelector('#functionFilter'),sectorFilter=document.querySelector('#sectorFilter');
functionFilter.add(new Option('전체 보장 기능','all'));normalizationRules.forEach(rule=>functionFilter.add(new Option(rule.label,rule.id)));
document.querySelector('#insurerCount').textContent=`등록 대상 보험사 ${insurerCatalog.length}곳`;
function renderDirectory(){const selectedRule=normalizationRules.find(x=>x.id===functionFilter.value)||normalizationRules[0];const companies=insurerCatalog.filter(x=>sectorFilter.value==='all'||x.sector===sectorFilter.value);document.querySelector('#aliasDirectory').innerHTML=companies.map(company=>`<article class="alias-card"><h3>${company.name}</h3><p class="alias-meta">${company.sector} · ${company.status}</p><ul class="alias-list">${selectedRule.aliases.slice(0,3).map(alias=>`<li>${alias}<span>최종 확인: ${selectedRule.proof}</span></li>`).join('')}</ul></article>`).join('');}
functionFilter.addEventListener('change',renderDirectory);sectorFilter.addEventListener('change',renderDirectory);renderDirectory();
setScenarioOptions();render();
