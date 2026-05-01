// CHUNAV SAATHI — quiz-data.js
const QUIZ_DATA = {
  mr: [
    { q:'मतदानाचे किमान वय किती आहे?', opts:['१६ वर्षे','१८ वर्षे','२१ वर्षे','२५ वर्षे'], ans:1, exp:'भारतात १८ वर्षे पूर्ण झालेल्या प्रत्येक नागरिकाला मतदानाचा अधिकार आहे.' },
    { q:'EVM चे पूर्ण नाव काय आहे?', opts:['Electronic Voting Machine','Electric Vote Maker','Electoral Voting Method','Electronic Voter Machine'], ans:0, exp:'EVM म्हणजे Electronic Voting Machine — हे मतदानासाठी वापरले जाणारे इलेक्ट्रॉनिक यंत्र आहे.' },
    { q:'VVPAT मधील कागदी स्लिप किती सेकंद दिसते?', opts:['३ सेकंद','५ सेकंद','७ सेकंद','१० सेकंद'], ans:2, exp:'VVPAT मध्ये मतदानानंतर ७ सेकंदांसाठी कागदी स्लिप दिसते जी मतदार पाहू शकतो.' },
    { q:'NOTA म्हणजे काय?', opts:['None of the Above','Not Open to All','No Tax on Agriculture','National Official Tally Act'], ans:0, exp:'NOTA म्हणजे "None of the Above" — जेव्हा मतदाराला कोणताही उमेदवार पसंत नसतो तेव्हा हा पर्याय वापरतात.' },
    { q:'मतदान यादीत नाव नोंदवण्यासाठी कोणता फॉर्म भरावा लागतो?', opts:['Form 1','Form 6','Form 8','Form 16'], ans:1, exp:'Form 6 हा नवीन मतदार नोंदणीसाठी वापरला जाणारा अर्ज आहे.' },
    { q:'EVM कोणत्या प्रकारे internet शी जोडलेले असते?', opts:['WiFi द्वारे','Bluetooth द्वारे','Cable द्वारे','जोडलेले नसते'], ans:3, exp:'EVM हे Standalone यंत्र आहे — ते कोणत्याही नेटवर्क किंवा इंटरनेटशी जोडलेले नसते.' },
    { q:'मतदान केंद्रावर कोणते ओळखपत्र आवश्यक आहे?', opts:['फक्त Aadhaar','फक्त EPIC','ECI मान्य कोणतेही एक','पॅन कार्ड आवश्यक'], ans:2, exp:'ECI ने मंजूर केलेल्या १२ पैकी कोणतेही एक ओळखपत्र चालते.' },
    { q:'मतदान किती वाजेपासून किती वाजेपर्यंत होते?', opts:['सकाळी ६ ते संध्याकाळी ५','सकाळी ७ ते संध्याकाळी ६','सकाळी ८ ते संध्याकाळी ७','सकाळी ९ ते संध्याकाळी ८'], ans:1, exp:'मतदान सकाळी ७ वाजल्यापासून संध्याकाळी ६ वाजेपर्यंत होते.' },
    { q:'अमिट शाई कोणत्या बोटावर लावली जाते?', opts:['उजव्या हाताच्या तर्जनीवर','डाव्या हाताच्या तर्जनीवर','उजव्या अंगठ्यावर','डाव्या करंगळीवर'], ans:1, exp:'अमिट शाई डाव्या हाताच्या तर्जनीवर (index finger) लावली जाते.' },
    { q:'मतदान केंद्राजवळ प्रचार करणे कधी बंद होते?', opts:['मतदानाच्या ४८ तास आधी','मतदानाच्या २४ तास आधी','मतदानाच्या दिवशी सकाळी','मतदान संपल्यावर'], ans:0, exp:'मतदानाच्या ४८ तास आधी सर्व प्रकारचा निवडणूक प्रचार बंद होतो.' }
  ],
  hi: [
    { q:'मतदान की न्यूनतम आयु क्या है?', opts:['16 वर्ष','18 वर्ष','21 वर्ष','25 वर्ष'], ans:1, exp:'भारत में 18 वर्ष पूर्ण हो जाने पर हर नागरिक को मतदान का अधिकार है।' },
    { q:'EVM का पूरा नाम क्या है?', opts:['Electronic Voting Machine','Electric Vote Maker','Electoral Voting Method','Electronic Voter Machine'], ans:0, exp:'EVM यानी Electronic Voting Machine — मतदान के लिए उपयोग की जाने वाली इलेक्ट्रॉनिक मशीन।' },
    { q:'VVPAT में पर्ची कितने सेकंड दिखती है?', opts:['3 सेकंड','5 सेकंड','7 सेकंड','10 सेकंड'], ans:2, exp:'VVPAT में वोट के बाद 7 सेकंड के लिए पर्ची दिखाई देती है।' },
    { q:'NOTA का मतलब क्या है?', opts:['None of the Above','Not Open to All','No Tax on Agriculture','National Official Tally Act'], ans:0, exp:'NOTA का मतलब है "None of the Above" — जब मतदाता को कोई उम्मीदवार पसंद न हो।' },
    { q:'मतदाता सूची में नाम दर्ज करने के लिए कौन-सा फॉर्म भरना होता है?', opts:['Form 1','Form 6','Form 8','Form 16'], ans:1, exp:'Form 6 नए मतदाता पंजीकरण के लिए आवेदन पत्र है।' },
    { q:'EVM किस नेटवर्क से जुड़ी होती है?', opts:['WiFi से','Bluetooth से','Cable से','किसी से नहीं'], ans:3, exp:'EVM Standalone डिवाइस है — यह किसी भी नेटवर्क या इंटरनेट से नहीं जुड़ी।' },
    { q:'मतदान केंद्र पर कौन-सा पहचान पत्र ज़रूरी है?', opts:['केवल Aadhaar','केवल EPIC','ECI मान्य कोई एक','PAN Card ज़रूरी'], ans:2, exp:'ECI द्वारा मान्य 12 में से कोई भी एक दस्तावेज़ चलता है।' },
    { q:'मतदान कितने बजे से कितने बजे तक होता है?', opts:['सुबह 6 से शाम 5','सुबह 7 से शाम 6','सुबह 8 से शाम 7','सुबह 9 से शाम 8'], ans:1, exp:'मतदान सुबह 7 बजे से शाम 6 बजे तक होता है।' },
    { q:'अमिट स्याही किस उंगली पर लगाई जाती है?', opts:['दाहिने हाथ की तर्जनी','बाएं हाथ की तर्जनी','दाहिने अंगूठे','बाएं छोटी उंगली'], ans:1, exp:'अमिट स्याही बाएं हाथ की तर्जनी (index finger) पर लगाई जाती है।' },
    { q:'मतदान केंद्र के पास प्रचार कब बंद होता है?', opts:['मतदान से 48 घंटे पहले','मतदान से 24 घंटे पहले','मतदान के दिन सुबह','मतदान के बाद'], ans:0, exp:'मतदान से 48 घंटे पहले सभी प्रकार का चुनाव प्रचार बंद हो जाता है।' }
  ],
  en: [
    { q:'What is the minimum age to vote in India?', opts:['16 years','18 years','21 years','25 years'], ans:1, exp:'Every Indian citizen who is 18 years or older has the right to vote.' },
    { q:'What does EVM stand for?', opts:['Electronic Voting Machine','Electric Vote Maker','Electoral Voting Method','Electronic Voter Machine'], ans:0, exp:'EVM stands for Electronic Voting Machine — the electronic device used for casting votes.' },
    { q:'For how many seconds does the VVPAT slip appear?', opts:['3 seconds','5 seconds','7 seconds','10 seconds'], ans:2, exp:'After pressing the EVM button, a paper slip is displayed in the VVPAT window for exactly 7 seconds.' },
    { q:'What does NOTA stand for?', opts:['None of the Above','Not Open to All','No Tax on Agriculture','National Official Tally Act'], ans:0, exp:'NOTA means "None of the Above" — used when a voter does not prefer any candidate.' },
    { q:'Which form is used for new voter registration?', opts:['Form 1','Form 6','Form 8','Form 16'], ans:1, exp:'Form 6 is the application form for inclusion in the electoral roll for new voters.' },
    { q:'How is the EVM connected to the internet?', opts:['Via WiFi','Via Bluetooth','Via Cable','It is not connected'], ans:3, exp:'EVMs are standalone, non-networked devices with no wireless or wired internet connectivity — by fundamental hardware design.' },
    { q:'Which ID document is required at the polling booth?', opts:['Only Aadhaar','Only EPIC','Any one ECI-approved ID','PAN Card required'], ans:2, exp:'Any one of the 12 ECI-approved documents is accepted at polling booths.' },
    { q:'What are the polling hours in India?', opts:['6 AM to 5 PM','7 AM to 6 PM','8 AM to 7 PM','9 AM to 8 PM'], ans:1, exp:'Voting takes place from 7 AM to 6 PM on polling day.' },
    { q:'On which finger is indelible ink applied?', opts:['Right index finger','Left index finger','Right thumb','Left little finger'], ans:1, exp:'Indelible ink is applied on the left index finger (terjani) of the voter.' },
    { q:'When does campaigning near polling booths stop?', opts:['48 hours before voting','24 hours before voting','Morning of voting day','After voting ends'], ans:0, exp:'All election campaigning must stop 48 hours before the close of polling.' }
  ]
};

const MYTHS_DATA = {
  mr: [
    { claim:'EVM हॅक होऊ शकते आणि निवडणूक परिणाम बदलता येतात', verdict:'false', explanation:'EVM हे Standalone, non-networked, battery-powered यंत्र आहे. त्यात कोणताही wireless किंवा wired communication नाही. त्याची "Write Once, Read Many" memory architecture ते remote tampering साठी प्रतिरोधक बनवते.', verdictLabel:'❌ हे खोटे आहे' },
    { claim:'मतदार यादीत नाव नसेल तर मतदान करता येत नाही', verdict:'true', explanation:'मतदार यादीत नाव असणे आवश्यक आहे. त्यामुळेच voterportal.eci.gov.in वर आधीच नाव तपासणे महत्त्वाचे आहे. नाव नसेल तर Form 6 भरून नोंदणी करा.', verdictLabel:'✅ हे खरे आहे' },
    { claim:'NOTA ला सर्वाधिक मते मिळाल्यास पुनर्निवडणूक होते', verdict:'false', explanation:'NOTA ला कितीही मते मिळाली तरी त्याचा निवडणूक निकालावर कोणताही कायदेशीर परिणाम होत नाही. NOTA नंतर सर्वाधिक मते असलेला मानवी उमेदवार विजयी ठरतो.', verdictLabel:'❌ हे खोटे आहे' },
    { claim:'पैसे घेणे आणि नंतर स्वतःच्या मनाने मत देणे चालते', verdict:'false', explanation:'निवडणूक लाच घेणे हा कायद्याने गुन्हा आहे. Representation of People Act 1951 अंतर्गत हे दंडनीय आहे. मतदार आणि देणारे दोघेही दोषी ठरतात.', verdictLabel:'❌ हे खोटे आहे' },
    { claim:'मतदान केंद्रावर फोटो काढणे बंदी आहे', verdict:'true', explanation:'मतदान कक्षात फोटो काढणे सक्त बंदी आहे. मत गुप्त ठेवणे हा मतदाराचा मूलभूत अधिकार आहे आणि कोणीही पाहू नये की तुम्ही कोणाला मत दिले.', verdictLabel:'✅ हे खरे आहे' }
  ],
  hi: [
    { claim:'EVM हैक हो सकती है और चुनाव परिणाम बदले जा सकते हैं', verdict:'false', explanation:'EVM Standalone, non-networked, battery-powered डिवाइस है। इसमें कोई wireless या wired communication नहीं है। इसकी "Write Once, Read Many" memory architecture इसे remote tampering से सुरक्षित बनाती है।', verdictLabel:'❌ यह झूठ है' },
    { claim:'मतदाता सूची में नाम न हो तो वोट नहीं दे सकते', verdict:'true', explanation:'मतदाता सूची में नाम होना ज़रूरी है। इसलिए voterportal.eci.gov.in पर पहले नाम जांचें। नाम न हो तो Form 6 भरकर पंजीकरण करें।', verdictLabel:'✅ यह सच है' },
    { claim:'NOTA को सबसे ज़्यादा वोट मिलने पर दोबारा चुनाव होता है', verdict:'false', explanation:'NOTA को कितने भी वोट मिलें, इसका चुनाव परिणाम पर कोई कानूनी असर नहीं होता। NOTA के बाद सबसे ज़्यादा वोट पाने वाला उम्मीदवार जीतता है।', verdictLabel:'❌ यह झूठ है' },
    { claim:'पैसे लेकर भी मनपसंद उम्मीदवार को वोट दे सकते हैं', verdict:'false', explanation:'चुनावी रिश्वत लेना कानूनन अपराध है। Representation of People Act 1951 के तहत दंडनीय है — लेने वाले और देने वाले दोनों दोषी।', verdictLabel:'❌ यह झूठ है' },
    { claim:'मतदान केंद्र पर फोटो खींचना मना है', verdict:'true', explanation:'मतदान कक्ष में फोटो खींचना सख्त मना है। गुप्त मतदान मतदाता का मूल अधिकार है और किसी को नहीं पता होना चाहिए कि आपने किसे वोट दिया।', verdictLabel:'✅ यह सच है' }
  ],
  en: [
    { claim:'EVMs can be hacked and election results can be manipulated', verdict:'false', explanation:'EVMs are standalone, non-networked, battery-powered devices with no wireless or wired communication components. Their "Write Once, Read Many" memory architecture makes them immune to remote cyber-tampering by fundamental hardware design.', verdictLabel:'❌ This is FALSE' },
    { claim:'You cannot vote if your name is not on the electoral roll', verdict:'true', explanation:"This is correct. Your name must be on the electoral roll to vote. That's why checking your name at voterportal.eci.gov.in before election day is crucial. If not found, file Form 6.", verdictLabel:'✅ This is TRUE' },
    { claim:'If NOTA gets the most votes, a re-election is held', verdict:'false', explanation:'NOTA has no legal power to affect the election outcome. Even if NOTA receives a mathematical majority, the human candidate with the next highest votes is declared the winner.', verdictLabel:'❌ This is FALSE' },
    { claim:'You can accept money and still vote for whoever you want', verdict:'false', explanation:'Accepting electoral bribes is a criminal offence under the Representation of the People Act 1951. Both the giver and receiver are liable for prosecution.', verdictLabel:'❌ This is FALSE' },
    { claim:'Photography inside the polling booth is prohibited', verdict:'true', explanation:'Photography inside the voting compartment is strictly prohibited. Secret ballot is a fundamental right of every voter — no one should know who you voted for.', verdictLabel:'✅ This is TRUE' }
  ]
};

const RULES_DATA = {
  mr: {
    dos: [
      { icon:'✅', title:'मतदार यादीत नाव तपासा', desc:'निवडणुकीआधी voterportal.eci.gov.in वर तुमचे नाव आणि मतदान केंद्र तपासा.' },
      { icon:'🪪', title:'ओळखपत्र सोबत ठेवा', desc:'ECI मान्य ओळखपत्र — Aadhaar, EPIC, पासपोर्ट किंवा इतर — सोबत घेऊन जा.' },
      { icon:'⏰', title:'वेळेत मतदान करा', desc:'सकाळी ७ ते संध्याकाळी ६ या वेळात जा. शेवटच्या क्षणाची वाट पाहू नका.' },
      { icon:'🤫', title:'गुप्त मतदान ठेवा', desc:'तुम्ही कोणाला मत दिले हे कोणालाही सांगणे बंधनकारक नाही — हा तुमचा अधिकार आहे.' },
      { icon:'📱', title:'ECI अॅप वापरा', desc:'Voter Helpline App किंवा 1950 हेल्पलाइनवर कोणत्याही अडचणी कळवा.' }
    ],
    donts: [
      { icon:'🚫', title:'मतदान केंद्राजवळ प्रचार करू नका', desc:'मतदान केंद्राच्या १०० मीटरच्या आत कोणताही प्रचार करणे बेकायदेशीर आहे.' },
      { icon:'📸', title:'मतदान कक्षात फोटो काढू नका', desc:'मतदान कक्षात फोन किंवा कॅमेरा नेणे आणि फोटो काढणे कायद्याने बंदी आहे.' },
      { icon:'💰', title:'पैसे घेऊ नका', desc:'मतासाठी कोणाकडूनही पैसे, भेटवस्तू किंवा दारू घेणे हा गंभीर गुन्हा आहे.' },
      { icon:'🍺', title:'मद्यपान करू नका', desc:'मतदानाच्या दिवशी मतदान केंद्रावर मद्यपान करून जाणे बेकायदेशीर आहे.' },
      { icon:'👥', title:'दुसऱ्यांना मतदान करण्यास भाग पाडू नका', desc:'इतरांच्या मतावर दबाव आणणे किंवा धमकी देणे हा गुन्हा आहे.' }
    ]
  },
  hi: {
    dos: [
      { icon:'✅', title:'मतदाता सूची में नाम जांचें', desc:'चुनाव से पहले voterportal.eci.gov.in पर अपना नाम और मतदान केंद्र जांचें।' },
      { icon:'🪪', title:'पहचान पत्र साथ रखें', desc:'ECI मान्य दस्तावेज़ — Aadhaar, EPIC, पासपोर्ट आदि — साथ लेकर जाएं।' },
      { icon:'⏰', title:'समय पर वोट डालें', desc:'सुबह 7 से शाम 6 के बीच जाएं। आखिरी घड़ी का इंतजार न करें।' },
      { icon:'🤫', title:'मतदान गोपनीय रखें', desc:'आपने किसे वोट दिया, यह किसी को बताना जरूरी नहीं — यह आपका अधिकार है।' },
      { icon:'📱', title:'ECI ऐप का उपयोग करें', desc:'Voter Helpline App या 1950 हेल्पलाइन पर किसी भी समस्या की जानकारी दें।' }
    ],
    donts: [
      { icon:'🚫', title:'मतदान केंद्र के पास प्रचार न करें', desc:'मतदान केंद्र के 100 मीटर के भीतर कोई भी प्रचार करना गैरकानूनी है।' },
      { icon:'📸', title:'मतदान कक्ष में फोटो न खींचें', desc:'मतदान कक्ष में फोन या कैमरा ले जाना और फोटो खींचना कानूनन मना है।' },
      { icon:'💰', title:'पैसे न लें', desc:'वोट के लिए किसी से भी पैसे, उपहार या शराब लेना गंभीर अपराध है।' },
      { icon:'🍺', title:'शराब न पीएं', desc:'मतदान के दिन मतदान केंद्र पर नशे में जाना गैरकानूनी है।' },
      { icon:'👥', title:'दूसरों पर दबाव न डालें', desc:'किसी के मत को प्रभावित करना या धमकी देना अपराध है।' }
    ]
  },
  en: {
    dos: [
      { icon:'✅', title:'Check your name on the roll', desc:'Before election day, verify your name and polling booth at voterportal.eci.gov.in.' },
      { icon:'🪪', title:'Carry your ID document', desc:'Bring any ECI-approved document — Aadhaar, EPIC, Passport, Driving Licence, etc.' },
      { icon:'⏰', title:'Vote on time', desc:'Go between 7 AM and 6 PM. Do not wait until the last moment.' },
      { icon:'🤫', title:'Keep your vote secret', desc:'You are not obligated to tell anyone who you voted for — this is your fundamental right.' },
      { icon:'📱', title:'Use the ECI app', desc:'Report any irregularities on the Voter Helpline App or call 1950.' }
    ],
    donts: [
      { icon:'🚫', title:"Don't campaign near the booth", desc:'Any form of campaigning within 100 metres of a polling station is prohibited by law.' },
      { icon:'📸', title:"Don't photograph inside the booth", desc:'Carrying phones or cameras into the voting compartment and taking photos is a criminal offence.' },
      { icon:'💰', title:"Don't accept money or gifts", desc:'Accepting cash, gifts, or alcohol in exchange for your vote is a serious criminal offence.' },
      { icon:'🍺', title:"Don't be intoxicated", desc:'Arriving at the polling station under the influence of alcohol is illegal.' },
      { icon:'👥', title:"Don't pressurize others", desc:'Influencing or threatening another voter is a criminal offence punishable by law.' }
    ]
  }
};
