// CHUNAV SAATHI — content.js — All multilingual content
const CONTENT = {
  mr: {
    app_name: 'चुनाव साथी', tagline: 'तुमचे मत, तुमची ताकद',
    lang_title: 'भाषा निवडा', lang_subtitle: 'आपली भाषा निवडा',
    lang_continue: 'पुढे जा →',
    nav_home: 'मुख्य', nav_learn: 'शिकूया', nav_quiz: 'क्विझ', nav_rules: 'नियम', nav_cert: 'प्रमाणपत्र',
    home_greeting: 'नमस्कार! 🙏', home_title: 'चुनाव साथी', home_subtitle: 'मतदानाबद्दल सर्व जाणून घ्या',
    home_cards: [
      { icon: '🗳️', label: 'मतदान प्रक्रिया', screen: 'explainer', desc: 'मतदान कसे करावे?' },
      { icon: '⚡', label: 'EVM सराव', screen: 'evm', desc: 'मशीन वापरण्याचा सराव' },
      { icon: '🧠', label: 'क्विझ', screen: 'quiz', desc: 'ज्ञान तपासा' },
      { icon: '🔍', label: 'गैरसमज', screen: 'myths', desc: 'खोट्या बातम्या ओळखा' },
      { icon: '📋', label: 'मतदार नियम', screen: 'rules', desc: 'काय करावे, काय नाही' },
      { icon: '🏆', label: 'प्रमाणपत्र', screen: 'certificate', desc: 'प्रमाणपत्र मिळवा' }
    ],
    explainer_title: 'मतदान प्रक्रिया', explainer_subtitle: 'पायरी पायरीने शिका',
    explainer_prev: '← मागे', explainer_next: 'पुढे →', explainer_done: '✓ पूर्ण झाले',
    explainer_steps: [
      { num:1, icon:'🏛️', title:'मतदान केंद्रावर जा', desc:'तुमच्या नोंदणी केलेल्या मतदान केंद्रावर जा. सकाळी ७ ते संध्याकाळी ६ या वेळेत मतदान होते. वेळेत या.', tip:'💡 electoralsearch.eci.gov.in वर तुमचे मतदान केंद्र शोधा' },
      { num:2, icon:'🪪', title:'ओळखपत्र दाखवा', desc:'Aadhaar, मतदार ओळखपत्र (EPIC), पासपोर्ट, ड्रायव्हिंग लायसन्स किंवा बँक पासबुक — यापैकी एक ओळखपत्र आवश्यक आहे.', tip:'💡 ECI ने मंजूर केलेल्या १२ ओळखपत्रांपैकी एक चालेल' },
      { num:3, icon:'📋', title:'यादीत नाव तपासा', desc:'पहिला मतदान अधिकारी मतदार यादीत तुमचे नाव तपासतो. तुमचा क्रमांक मोठ्याने सांगितला जातो.', tip:'💡 आधीच voterportal.eci.gov.in वर नाव तपासा' },
      { num:4, icon:'🖊️', title:'शाई लावणे', desc:'दुसरा अधिकारी तुमच्या डाव्या हाताच्या तर्जनीवर अमिट शाई लावतो. ही शाई बनावट मतदान रोखते.', tip:'💡 शाई ३-४ आठवडे टिकते — हे ओळखपत्र आहे' },
      { num:5, icon:'✍️', title:'Form 17A मध्ये सही करा', desc:'मतदार नोंदणी पुस्तकात (Form 17A) सही किंवा अंगठा लावा. हे तुमचे मतदानाचे अधिकृत नोंद आहे.', tip:'💡 सही करण्यापूर्वी यादीतील तुमचे नाव पुन्हा तपासा' },
      { num:6, icon:'🎫', title:'मतदार स्लिप घ्या', desc:'तिसरा अधिकारी तुम्हाला मतदार स्लिप देतो आणि Control Unit वर Ballot बटण दाबतो. आता तुम्ही मत देण्यास तयार आहात.', tip:'💡 स्लिप मिळाली की मतदान कक्षात जा' },
      { num:7, icon:'☑️', title:'EVM वर बटण दाबा', desc:'मतदान कक्षात जाऊन तुमच्या पसंतीच्या उमेदवाराच्या नावाजवळील निळे बटण दाबा. बीप आवाज येईल.', tip:'💡 NOTA (वरीलपैकी कोणी नाही) हा पर्याय शेवटी असतो' },
      { num:8, icon:'📄', title:'VVPAT स्लिप तपासा', desc:'बटण दाबल्यावर VVPAT मशीनमध्ये ७ सेकंदांसाठी कागदी स्लिप दिसेल — उमेदवाराचे नाव, चिन्ह आणि क्रमांक दिसेल.', tip:'💡 स्लिप बरोबर असल्यास तुमचे मत नोंदले गेले' },
      { num:9, icon:'🚶', title:'शांतपणे बाहेर पडा', desc:'मत दिल्यानंतर शांतपणे मतदान केंद्र सोडा. इतरांना मत कसे दिले हे सांगू नका — गुप्त मतदान हा तुमचा अधिकार आहे.', tip:'💡 अभिनंदन! तुम्ही लोकशाहीत सहभागी झालात 🎉' }
    ],
    evm_title: 'EVM सराव', evm_subtitle: 'मतदान यंत्र वापरण्याचा सराव करा',
    evm_instruction: 'उमेदवार निवडा आणि VOTE बटण दाबा',
    evm_screen_idle: 'मतदान यंत्र तयार आहे', evm_screen_selected: 'उमेदवार निवडला',
    evm_screen_voted: '✓ मत नोंदले गेले', evm_vote_btn: 'VOTE',
    evm_vvpat_label: 'VVPAT — कागदी पुरावा (७ सेकंद)', evm_voted_title: 'मत यशस्वीरित्या दिले!',
    evm_voted_desc: 'बीप आवाज आला. तुमचे मत सुरक्षित आहे.', evm_reset: 'पुन्हा सराव करा',
    evm_candidates: [
      { num:'१', name:'रामराव पाटील', party:'पक्ष अ', symbol:'🌸' },
      { num:'२', name:'सुनीता देशमुख', party:'पक्ष ब', symbol:'🌿' },
      { num:'३', name:'विजय जाधव', party:'पक्ष क', symbol:'⭐' },
      { num:'४', name:'NOTA', party:'वरीलपैकी कोणी नाही', symbol:'🚫' }
    ],
    quiz_title: 'मतदान क्विझ', quiz_start: 'क्विझ सुरू करा', quiz_next: 'पुढील प्रश्न',
    quiz_finish: 'निकाल पहा', quiz_restart: 'पुन्हा खेळा', quiz_correct: '✅ बरोबर!', quiz_incorrect: '❌ चुकीचे',
    quiz_score_label: 'तुमचा स्कोर', quiz_out_of: 'पैकी',
    myths_title: 'गैरसमज दूर करा', myths_subtitle: 'खरे की खोटे — स्वतः तपासा',
    myths_true: '✅ हे खरे आहे', myths_false: '❌ हे खोटे आहे', myths_misleading: '⚠️ हे दिशाभूल करणारे आहे',
    rules_title: 'मतदार नियम', rules_do: 'काय करावे ✅', rules_dont: 'काय करू नये ❌',
    cert_title: 'जागरूक मतदार प्रमाणपत्र', cert_name_label: 'तुमचे पूर्ण नाव लिहा',
    cert_name_placeholder: 'उदा. रामराव पाटील', cert_generate: 'प्रमाणपत्र तयार करा 🏆',
    cert_share: '📤 शेअर करा', cert_new: '🔄 नवीन प्रमाणपत्र',
    cert_heading: 'जागरूक मतदार प्रमाणपत्र', cert_org: 'चुनाव साथी — Maharashtra',
    cert_to: 'हे प्रमाणपत्र देण्यात येते',
    cert_body: 'यांनी मतदान प्रक्रिया, EVM वापर, मतदार नियम आणि गैरसमज यांचे संपूर्ण शिक्षण घेतले असून एक जबाबदार आणि जागरूक मतदार म्हणून लोकशाहीत सहभागी होण्यास सक्षम आहेत.',
    cert_seal: '🔏', cert_footer: 'Election Commission of India | मतदान हा अधिकार आणि जबाबदारी आहे'
  },
  hi: {
    app_name: 'चुनाव साथी', tagline: 'आपका वोट, आपकी ताकत',
    lang_title: 'भाषा चुनें', lang_subtitle: 'अपनी भाषा चुनें',
    lang_continue: 'आगे बढ़ें →',
    nav_home: 'मुख्य', nav_learn: 'सीखें', nav_quiz: 'क्विज़', nav_rules: 'नियम', nav_cert: 'प्रमाणपत्र',
    home_greeting: 'नमस्ते! 🙏', home_title: 'चुनाव साथी', home_subtitle: 'मतदान के बारे में सब कुछ जानें',
    home_cards: [
      { icon: '🗳️', label: 'मतदान प्रक्रिया', screen: 'explainer', desc: 'वोट कैसे दें?' },
      { icon: '⚡', label: 'EVM अभ्यास', screen: 'evm', desc: 'मशीन का अभ्यास करें' },
      { icon: '🧠', label: 'क्विज़', screen: 'quiz', desc: 'ज्ञान जांचें' },
      { icon: '🔍', label: 'भ्रांतियां', screen: 'myths', desc: 'झूठी खबरें पहचानें' },
      { icon: '📋', label: 'मतदाता नियम', screen: 'rules', desc: 'क्या करें, क्या नहीं' },
      { icon: '🏆', label: 'प्रमाणपत्र', screen: 'certificate', desc: 'प्रमाणपत्र पाएं' }
    ],
    explainer_title: 'मतदान प्रक्रिया', explainer_subtitle: 'चरण दर चरण सीखें',
    explainer_prev: '← पीछे', explainer_next: 'आगे →', explainer_done: '✓ पूरा हुआ',
    explainer_steps: [
      { num:1, icon:'🏛️', title:'मतदान केंद्र जाएं', desc:'अपने पंजीकृत मतदान केंद्र पर जाएं। सुबह 7 बजे से शाम 6 बजे तक मतदान होता है।', tip:'💡 electoralsearch.eci.gov.in पर अपना केंद्र खोजें' },
      { num:2, icon:'🪪', title:'पहचान पत्र दिखाएं', desc:'Aadhaar, मतदाता पहचान पत्र (EPIC), पासपोर्ट या बैंक पासबुक — कोई एक दस्तावेज़ ज़रूरी है।', tip:'💡 ECI द्वारा मान्य 12 दस्तावेज़ों में से कोई एक' },
      { num:3, icon:'📋', title:'सूची में नाम देखें', desc:'पहले अधिकारी मतदाता सूची में आपका नाम जांचते हैं। नाम और क्रमांक ज़ोर से पढ़ा जाता है।', tip:'💡 पहले voterportal.eci.gov.in पर नाम जांचें' },
      { num:4, icon:'🖊️', title:'स्याही लगाई जाती है', desc:'दूसरे अधिकारी आपकी बाईं तर्जनी पर अमिट स्याही लगाते हैं। यह दोबारा मतदान रोकती है।', tip:'💡 स्याही 3-4 हफ्ते रहती है' },
      { num:5, icon:'✍️', title:'Form 17A में हस्ताक्षर', desc:'मतदाता पंजिका में हस्ताक्षर या अंगूठा लगाएं — यह आपके मतदान का आधिकारिक रिकॉर्ड है।', tip:'💡 हस्ताक्षर से पहले अपना नाम दोबारा जांचें' },
      { num:6, icon:'🎫', title:'पर्ची लें', desc:'तीसरे अधिकारी आपको पर्ची देते हैं और Ballot बटण दबाते हैं। अब आप वोट देने के लिए तैयार हैं।', tip:'💡 पर्ची मिलते ही मतदान कक्ष में जाएं' },
      { num:7, icon:'☑️', title:'EVM पर बटण दबाएं', desc:'मतदान कक्ष में अपने पसंदीदा उम्मीदवार के नाम के सामने नीला बटण दबाएं। बीप आएगा।', tip:'💡 NOTA (इनमें से कोई नहीं) अंत में होता है' },
      { num:8, icon:'📄', title:'VVPAT पर्ची देखें', desc:'बटण दबाने के बाद 7 सेकंड के लिए कागज़ी पर्ची दिखेगी — उम्मीदवार का नाम और चिह्न।', tip:'💡 पर्ची सही है तो वोट दर्ज हो गया' },
      { num:9, icon:'🚶', title:'शांति से बाहर निकलें', desc:'वोट देने के बाद शांति से बाहर निकलें। किसी को न बताएं आपने किसे वोट दिया।', tip:'💡 बधाई! आप लोकतंत्र में भागीदार बने 🎉' }
    ],
    evm_title: 'EVM अभ्यास', evm_subtitle: 'मतदान मशीन का अभ्यास करें',
    evm_instruction: 'उम्मीदवार चुनें और VOTE दबाएं',
    evm_screen_idle: 'मशीन तैयार है', evm_screen_selected: 'उम्मीदवार चुना गया',
    evm_screen_voted: '✓ वोट दर्ज हुआ', evm_vote_btn: 'VOTE',
    evm_vvpat_label: 'VVPAT — कागज़ी प्रमाण (7 सेकंड)', evm_voted_title: 'वोट सफलतापूर्वक दिया!',
    evm_voted_desc: 'बीप आया। आपका वोट सुरक्षित है।', evm_reset: 'फिर अभ्यास करें',
    evm_candidates: [
      { num:'1', name:'रामराव पाटील', party:'दल अ', symbol:'🌸' },
      { num:'2', name:'सुनीता देशमुख', party:'दल ब', symbol:'🌿' },
      { num:'3', name:'विजय जाधव', party:'दल क', symbol:'⭐' },
      { num:'4', name:'NOTA', party:'इनमें से कोई नहीं', symbol:'🚫' }
    ],
    quiz_title: 'मतदान क्विज़', quiz_start: 'क्विज़ शुरू करें', quiz_next: 'अगला सवाल',
    quiz_finish: 'परिणाम देखें', quiz_restart: 'फिर खेलें', quiz_correct: '✅ सही!', quiz_incorrect: '❌ गलत',
    quiz_score_label: 'आपका स्कोर', quiz_out_of: 'में से',
    myths_title: 'भ्रांतियां दूर करें', myths_subtitle: 'सच या झूठ — खुद जांचें',
    myths_true: '✅ यह सच है', myths_false: '❌ यह झूठ है', myths_misleading: '⚠️ यह भ्रामक है',
    rules_title: 'मतदाता नियम', rules_do: 'क्या करें ✅', rules_dont: 'क्या न करें ❌',
    cert_title: 'जागरूक मतदाता प्रमाणपत्र', cert_name_label: 'अपना पूरा नाम लिखें',
    cert_name_placeholder: 'जैसे रामराव पाटील', cert_generate: 'प्रमाणपत्र बनाएं 🏆',
    cert_share: '📤 शेयर करें', cert_new: '🔄 नया प्रमाणपत्र',
    cert_heading: 'जागरूक मतदाता प्रमाणपत्र', cert_org: 'चुनाव साथी — Maharashtra',
    cert_to: 'यह प्रमाणपत्र दिया जाता है',
    cert_body: 'ने मतदान प्रक्रिया, EVM उपयोग, मतदाता नियम और भ्रांतियों का संपूर्ण अध्ययन किया है और एक जिम्मेदार मतदाता के रूप में लोकतंत्र में भागीदार बनने के योग्य हैं।',
    cert_seal: '🔏', cert_footer: 'Election Commission of India | मतदान आपका अधिकार और जिम्मेदारी है'
  },
  en: {
    app_name: 'Chunav Saathi', tagline: 'Your Vote, Your Power',
    lang_title: 'Choose Language', lang_subtitle: 'Select your preferred language',
    lang_continue: 'Continue →',
    nav_home: 'Home', nav_learn: 'Learn', nav_quiz: 'Quiz', nav_rules: 'Rules', nav_cert: 'Certificate',
    home_greeting: 'Welcome! 🙏', home_title: 'Chunav Saathi', home_subtitle: 'Learn everything about voting',
    home_cards: [
      { icon: '🗳️', label: 'Voting Process', screen: 'explainer', desc: 'How to vote?' },
      { icon: '⚡', label: 'EVM Practice', screen: 'evm', desc: 'Practice the voting machine' },
      { icon: '🧠', label: 'Quiz', screen: 'quiz', desc: 'Test your knowledge' },
      { icon: '🔍', label: 'Myth Busters', screen: 'myths', desc: 'Spot fake news' },
      { icon: '📋', label: 'Voter Rules', screen: 'rules', desc: "Do's and Don'ts" },
      { icon: '🏆', label: 'Certificate', screen: 'certificate', desc: 'Get your certificate' }
    ],
    explainer_title: 'Voting Process', explainer_subtitle: 'Learn step by step',
    explainer_prev: '← Back', explainer_next: 'Next →', explainer_done: '✓ Done',
    explainer_steps: [
      { num:1, icon:'🏛️', title:'Go to Polling Booth', desc:'Go to your registered polling station. Voting happens from 7 AM to 6 PM. Arrive on time.', tip:'💡 Find your booth at electoralsearch.eci.gov.in' },
      { num:2, icon:'🪪', title:'Show Your ID', desc:'Bring Aadhaar, Voter ID (EPIC), Passport, Driving Licence, or bank passbook. Any one ECI-approved document.', tip:'💡 Any of the 12 ECI-approved documents is accepted' },
      { num:3, icon:'📋', title:'Verify Your Name', desc:'The 1st officer checks your name and serial number in the electoral roll and reads it aloud.', tip:'💡 Pre-check your name at voterportal.eci.gov.in' },
      { num:4, icon:'🖊️', title:'Indelible Ink Applied', desc:'The 2nd officer applies indelible ink on your left index finger. This prevents double voting.', tip:'💡 The ink lasts 3–4 weeks — it is your voting identity' },
      { num:5, icon:'✍️', title:'Sign Form 17A', desc:'Sign or give thumbprint in the electoral register (Form 17A). This is the official record of your vote.', tip:'💡 Verify your name before signing' },
      { num:6, icon:'🎫', title:'Receive Voter Slip', desc:'The 3rd officer gives you a voter slip and enables the Control Unit. You are now ready to vote.', tip:'💡 Enter the voting compartment once you receive the slip' },
      { num:7, icon:'☑️', title:'Press the EVM Button', desc:"In the voting compartment, press the blue button next to your chosen candidate's name. You'll hear a beep.", tip:'💡 NOTA (None of the Above) appears at the bottom' },
      { num:8, icon:'📄', title:'Check VVPAT Slip', desc:'A paper slip showing the candidate name and symbol appears for 7 seconds in the VVPAT machine window.', tip:'💡 If the slip is correct, your vote is recorded' },
      { num:9, icon:'🚶', title:'Exit Quietly', desc:"Leave the polling station calmly. Don't tell others who you voted for — secret ballot is your right.", tip:'💡 Congratulations! You participated in democracy 🎉' }
    ],
    evm_title: 'EVM Practice', evm_subtitle: 'Practice using the voting machine',
    evm_instruction: 'Select a candidate and press VOTE',
    evm_screen_idle: 'Machine Ready', evm_screen_selected: 'Candidate Selected',
    evm_screen_voted: '✓ Vote Recorded', evm_vote_btn: 'VOTE',
    evm_vvpat_label: 'VVPAT — Paper Proof (7 seconds)', evm_voted_title: 'Vote Cast Successfully!',
    evm_voted_desc: 'Beep confirmed. Your vote is secure.', evm_reset: 'Practice Again',
    evm_candidates: [
      { num:'1', name:'Ramrao Patil', party:'Party A', symbol:'🌸' },
      { num:'2', name:'Sunita Deshmukh', party:'Party B', symbol:'🌿' },
      { num:'3', name:'Vijay Jadhav', party:'Party C', symbol:'⭐' },
      { num:'4', name:'NOTA', party:'None of the Above', symbol:'🚫' }
    ],
    quiz_title: 'Voting Quiz', quiz_start: 'Start Quiz', quiz_next: 'Next Question',
    quiz_finish: 'See Results', quiz_restart: 'Play Again', quiz_correct: '✅ Correct!', quiz_incorrect: '❌ Incorrect',
    quiz_score_label: 'Your Score', quiz_out_of: 'out of',
    myths_title: 'Myth Busters', myths_subtitle: 'True or False — Find out yourself',
    myths_true: '✅ This is TRUE', myths_false: '❌ This is FALSE', myths_misleading: '⚠️ This is MISLEADING',
    rules_title: 'Voter Rules', rules_do: "Do's ✅", rules_dont: "Don'ts ❌",
    cert_title: 'Aware Voter Certificate', cert_name_label: 'Enter your full name',
    cert_name_placeholder: 'e.g. Ramrao Patil', cert_generate: 'Generate Certificate 🏆',
    cert_share: '📤 Share', cert_new: '🔄 New Certificate',
    cert_heading: 'Aware Voter Certificate', cert_org: 'Chunav Saathi — Maharashtra',
    cert_to: 'This certificate is awarded to',
    cert_body: 'has successfully completed the Chunav Saathi voter education programme, covering the voting process, EVM usage, voter rights, and electoral myths. They are now a responsible, informed voter ready to participate in Indian democracy.',
    cert_seal: '🔏', cert_footer: 'Election Commission of India | Voting is your right and responsibility'
  }
};

// ── NEW CONTENT (feature/ui-upgrade) ──────────────────────────

// Settings labels
const SETTINGS_CONTENT = {
  mr: {
    nav_settings: 'सेटिंग्ज',
    settings_title: 'सेटिंग्ज', settings_lang: 'भाषा', settings_textsize: 'अक्षर आकार',
    settings_small: 'लहान', settings_medium: 'मध्यम', settings_large: 'मोठे',
    settings_voice_speed: 'आवाज गती', settings_slow: 'हळू', settings_normal: 'सामान्य', settings_fast: 'जलद',
    settings_progress: 'प्रगती', settings_reset: 'सर्व प्रगती रीसेट करा',
    settings_reset_confirm: 'तुम्हाला खात्री आहे का? सर्व डेटा हटेल.',
    settings_screens_done: 'पूर्ण झालेले विभाग',
  },
  hi: {
    nav_settings: 'सेटिंग्स',
    settings_title: 'सेटिंग्स', settings_lang: 'भाषा', settings_textsize: 'अक्षर आकार',
    settings_small: 'छोटा', settings_medium: 'मध्यम', settings_large: 'बड़ा',
    settings_voice_speed: 'आवाज की गति', settings_slow: 'धीमी', settings_normal: 'सामान्य', settings_fast: 'तेज़',
    settings_progress: 'प्रगति', settings_reset: 'सारी प्रगति रीसेट करें',
    settings_reset_confirm: 'क्या आप सुनिश्चित हैं? सारा डेटा हट जाएगा।',
    settings_screens_done: 'पूर्ण किए गए खंड',
  },
  en: {
    nav_settings: 'Settings',
    settings_title: 'Settings', settings_lang: 'Language', settings_textsize: 'Text Size',
    settings_small: 'Small', settings_medium: 'Medium', settings_large: 'Large',
    settings_voice_speed: 'Voice Speed', settings_slow: 'Slow', settings_normal: 'Normal', settings_fast: 'Fast',
    settings_progress: 'Progress', settings_reset: 'Reset All Progress',
    settings_reset_confirm: 'Are you sure? All data will be cleared.',
    settings_screens_done: 'Completed Sections',
  }
};

// Game A — Voting Day Simulation
const GAME_VOTING_DAY_DATA = {
  mr: {
    title: 'मतदान दिन', subtitle: 'योग्य निर्णय घ्या!',
    intro: 'आज मतदान आहे. प्रत्येक टप्प्यावर योग्य निर्णय घ्या.',
    complete: '🎉 तुम्ही यशस्वीरित्या मत दिले!',
    retry: 'पुन्हा प्रयत्न करा', next: 'पुढे →', finish: 'पूर्ण',
    decisions: [
      { q:'तुमच्याजवळ मतदार ओळखपत्र (EPIC) नाही — काय कराल?',
        opts:['घरी परत जा — मतदान करता येणार नाही','Aadhaar कार्ड घेऊन जा — ते ECI मान्य आहे','दुसऱ्याचे ओळखपत्र वापर'],
        ans:1, exp:'ECI ने मंजूर केलेली कोणतीही एक ओळखपत्र चालते — Aadhaar, पासपोर्ट, बँक पासबुक इ.' },
      { q:'मतदान केंद्राबाहेर कोणी पैसे देत आहे — काय कराल?',
        opts:['पैसे घ्या — कोण पाहणार?','नकार द्या आणि 1950 वर कळवा','पैसे घ्या पण त्यांना मत देऊ नका'],
        ans:1, exp:'निवडणूक लाच घेणे हा कायद्याने गुन्हा आहे. 1950 हेल्पलाइनवर कळवा.' },
      { q:'मतदान कक्षात तुमचा फोन आहे — काय कराल?',
        opts:['EVM चा फोटो काढा','फोन खिशात ठेवा आणि मत द्या','व्हिडीओ काढून WhatsApp वर शेअर करा'],
        ans:1, exp:'मतदान कक्षात फोटो/व्हिडीओ काढणे बेकायदेशीर आहे. फोन बंद किंवा खिशात ठेवा.' },
      { q:'EVM वर बटण दाबल्यावर VVPAT मध्ये चुकीचा उमेदवार दिसला — काय कराल?',
        opts:['शांतपणे बाहेर पडा — काही करता येणार नाही','ताबडतोब मतदान अधिकाऱ्याला कळवा','दुसऱ्या उमेदवाराला पुन्हा मत द्या'],
        ans:1, exp:'VVPAT मध्ये चुकीची स्लिप आल्यास तात्काळ Presiding Officer ला कळवा. तुम्हाला Challenged Vote चा अधिकार आहे.' },
      { q:'मतदान करून बाहेर पडताना पत्रकार विचारतो — कोणाला मत दिले?',
        opts:['सांगा — गर्व आहे माझ्या निर्णयाचा','नकार द्या — गुप्त मतदान हा तुमचा अधिकार आहे','खोटे सांगा'],
        ans:1, exp:'गुप्त मतदान हा भारतीय लोकशाहीचा मूलभूत आधार आहे. कोणालाही सांगणे बंधनकारक नाही.' }
    ]
  },
  hi: {
    title: 'मतदान दिन', subtitle: 'सही फैसला करें!',
    intro: 'आज मतदान का दिन है। हर कदम पर सही फैसला करें।',
    complete: '🎉 आपने सफलतापूर्वक वोट दिया!',
    retry: 'फिर कोशिश करें', next: 'आगे →', finish: 'पूरा',
    decisions: [
      { q:'आपके पास मतदाता पहचान पत्र (EPIC) नहीं है — क्या करेंगे?',
        opts:['घर वापस जाएं','Aadhaar कार्ड लेकर जाएं — वह ECI मान्य है','किसी और का पहचान पत्र इस्तेमाल करें'],
        ans:1, exp:'ECI द्वारा मान्य कोई भी एक दस्तावेज़ चलता है — Aadhaar, पासपोर्ट, बैंक पासबुक आदि।' },
      { q:'मतदान केंद्र के बाहर कोई पैसे दे रहा है — क्या करेंगे?',
        opts:['पैसे ले लो','मना करें और 1950 पर रिपोर्ट करें','पैसे लो पर उन्हें वोट मत दो'],
        ans:1, exp:'चुनावी रिश्वत लेना कानूनन अपराध है। 1950 हेल्पलाइन पर सूचित करें।' },
      { q:'मतदान कक्ष में आपके पास फोन है — क्या करेंगे?',
        opts:['EVM की फोटो खींचें','फोन जेब में रखें और वोट दें','वीडियो बनाकर WhatsApp पर डालें'],
        ans:1, exp:'मतदान कक्ष में फोटो/वीडियो बनाना गैरकानूनी है। फोन बंद या जेब में रखें।' },
      { q:'EVM का बटण दबाने पर VVPAT में गलत उम्मीदवार दिखा — क्या करेंगे?',
        opts:['चुपचाप बाहर निकलें','तुरंत मतदान अधिकारी को बताएं','दूसरे उम्मीदवार को फिर वोट दें'],
        ans:1, exp:'VVPAT में गलत पर्ची आने पर तुरंत Presiding Officer को बताएं। Challenged Vote का अधिकार है।' },
      { q:'वोट देकर निकलते समय पत्रकार पूछे — किसे वोट दिया?',
        opts:['बताएं — गर्व है अपने फैसले पर','मना करें — गुप्त मतदान आपका अधिकार है','झूठ बोलें'],
        ans:1, exp:'गुप्त मतदान भारतीय लोकतंत्र की नींव है। किसी को बताना जरूरी नहीं।' }
    ]
  },
  en: {
    title: 'Voting Day', subtitle: 'Make the right choices!',
    intro: 'Today is election day. Make the right decision at each step.',
    complete: '🎉 You successfully cast your vote!',
    retry: 'Try Again', next: 'Next →', finish: 'Finish',
    decisions: [
      { q:"You don't have your Voter ID (EPIC) — what do you do?",
        opts:['Go back home — you can\'t vote','Bring your Aadhaar card — it\'s ECI approved','Use someone else\'s ID'],
        ans:1, exp:'Any one of the 12 ECI-approved documents is accepted — Aadhaar, Passport, Bank Passbook, etc.' },
      { q:'Someone is offering money outside the polling booth — what do you do?',
        opts:['Take the money — who will know?','Refuse and report to 1950 helpline','Take money but vote for someone else'],
        ans:1, exp:'Accepting electoral bribes is a criminal offence. Report it to the 1950 ECI helpline.' },
      { q:'You have your phone in the voting compartment — what do you do?',
        opts:['Take a photo of the EVM','Keep the phone in your pocket and vote','Record a video and share on WhatsApp'],
        ans:1, exp:'Photography/video inside the voting compartment is illegal. Keep your phone off or in your pocket.' },
      { q:'After pressing the EVM button the VVPAT shows the wrong candidate — what do you do?',
        opts:['Leave quietly — nothing can be done','Immediately inform the Presiding Officer','Press another candidate\'s button'],
        ans:1, exp:'If the VVPAT slip is incorrect, immediately notify the Presiding Officer. You have the right to a Challenged Vote.' },
      { q:'After voting, a journalist asks who you voted for — what do you say?',
        opts:['Tell them — you\'re proud of your choice','Decline — secret ballot is your right','Lie'],
        ans:1, exp:'Secret ballot is a fundamental pillar of Indian democracy. You are not obligated to tell anyone.' }
    ]
  }
};

// Game B — Spot the Violation
const GAME_SPOT_DATA = {
  mr: {
    title: 'ओळखा कोण?', subtitle: 'MCC उल्लंघन ओळखा',
    intro: 'प्रत्येक परिस्थिती वाचा — VIOLATION आहे का?',
    score_label: 'स्कोर', finish: 'निकाल पहा', restart: 'पुन्हा खेळा',
    violation_btn: '❌ उल्लंघन', allowed_btn: '✅ परवानगी आहे',
    scenarios: [
      { scene:'मतदानाच्या दिवशी उमेदवार मतदान केंद्राजवळ जाहिरातफलक लावतो.', isViolation:true, exp:'मतदान केंद्राच्या १०० मीटरच्या आत प्रचार करणे MCC उल्लंघन आहे.' },
      { scene:'मतदान संपल्यानंतर एक राजकीय नेता पार्टी कार्यालयात बैठक घेतो.', isViolation:false, exp:'मतदान संपल्यावर कार्यालयीन बैठका कायदेशीर आहेत.' },
      { scene:'एक उमेदवार मतदानाच्या आदल्या दिवशी मतदारांना मोफत जेवण वाटतो.', isViolation:true, exp:'मतदारांना भेटवस्तू, जेवण किंवा दारू देणे निवडणूक लाच आहे आणि MCC उल्लंघन आहे.' },
      { scene:'एक नागरिक सोशल मीडियावर उमेदवाराच्या धोरणांवर स्वतःचे मत मांडतो.', isViolation:false, exp:'नागरिकांना सोशल मीडियावर मते व्यक्त करण्याचा अधिकार आहे — हे उल्लंघन नाही.' },
      { scene:'एक मंत्री सरकारी वाहन वापरून निवडणूक प्रचार करतो.', isViolation:true, exp:'सरकारी वाहन वा संसाधने निवडणूक प्रचारासाठी वापरणे MCC उल्लंघन आहे.' },
      { scene:'मतदानाच्या ४८ तास आधी सर्व प्रचार बंद होतो — उमेदवार घरी बसतो.', isViolation:false, exp:'Silent Period मध्ये प्रचार न करणे नियमानुसार आहे.' }
    ]
  },
  hi: {
    title: 'पहचानो कौन?', subtitle: 'MCC उल्लंघन पहचानें',
    intro: 'हर परिस्थिति पढ़ें — क्या यह उल्लंघन है?',
    score_label: 'स्कोर', finish: 'परिणाम देखें', restart: 'फिर खेलें',
    violation_btn: '❌ उल्लंघन', allowed_btn: '✅ अनुमति है',
    scenarios: [
      { scene:'मतदान के दिन उम्मीदवार मतदान केंद्र के पास होर्डिंग लगाता है।', isViolation:true, exp:'मतदान केंद्र के 100 मीटर के भीतर प्रचार करना MCC उल्लंघन है।' },
      { scene:'मतदान के बाद एक नेता पार्टी कार्यालय में बैठक करता है।', isViolation:false, exp:'मतदान के बाद कार्यालयीन बैठकें कानूनी हैं।' },
      { scene:'उम्मीदवार मतदान से एक दिन पहले मतदाताओं को मुफ्त खाना बांटता है।', isViolation:true, exp:'मतदाताओं को उपहार, खाना या शराब देना चुनावी रिश्वत और MCC उल्लंघन है।' },
      { scene:'एक नागरिक सोशल मीडिया पर उम्मीदवार की नीतियों पर राय देता है।', isViolation:false, exp:'नागरिकों को सोशल मीडिया पर राय देने का अधिकार है।' },
      { scene:'एक मंत्री सरकारी गाड़ी से चुनाव प्रचार करता है।', isViolation:true, exp:'सरकारी वाहन या संसाधन चुनाव प्रचार के लिए इस्तेमाल करना MCC उल्लंघन है।' },
      { scene:'मतदान से 48 घंटे पहले सारा प्रचार बंद — उम्मीदवार घर बैठता है।', isViolation:false, exp:'Silent Period में प्रचार न करना नियमानुसार है।' }
    ]
  },
  en: {
    title: 'Spot the Violation', subtitle: 'Identify MCC violations',
    intro: 'Read each scenario — is it a violation?',
    score_label: 'Score', finish: 'See Results', restart: 'Play Again',
    violation_btn: '❌ Violation', allowed_btn: '✅ Allowed',
    scenarios: [
      { scene:'A candidate puts up a banner near the polling station on election day.', isViolation:true, exp:'Campaigning within 100 metres of a polling station is an MCC violation.' },
      { scene:'After polling ends, a politician holds a meeting at the party office.', isViolation:false, exp:'Office meetings after polling hours are legal.' },
      { scene:'A candidate distributes free meals to voters the day before polling.', isViolation:true, exp:'Distributing gifts, food, or alcohol to voters is electoral bribery and an MCC violation.' },
      { scene:'A citizen posts their opinion on a candidate\'s policies on social media.', isViolation:false, exp:'Citizens have the right to express opinions on social media — not a violation.' },
      { scene:'A minister uses a government vehicle to campaign.', isViolation:true, exp:'Using government vehicles or resources for election campaigning is an MCC violation.' },
      { scene:'All campaigning stops 48 hours before voting — the candidate stays home.', isViolation:false, exp:'Respecting the Silent Period is required by law.' }
    ]
  }
};

// Game C — Election Timeline Puzzle
const GAME_TIMELINE_DATA = {
  mr: {
    title: 'चुनाव टाइमलाइन', subtitle: 'क्रम लावा!',
    intro: 'निवडणूक प्रक्रियेचे टप्पे योग्य क्रमात लावा.',
    submit: 'क्रम तपासा', restart: 'पुन्हा प्रयत्न करा', perfect: '🎉 परिपूर्ण! बरोबर क्रम!',
    stages: [
      { id:1, label:'निवडणूक आयोगाची घोषणा', icon:'📢', order:1, exp:'ECI निवडणूक तारखा जाहीर करते.' },
      { id:2, label:'आदर्श आचारसंहिता लागू', icon:'📜', order:2, exp:'घोषणेपासून MCC लागू होते.' },
      { id:3, label:'उमेदवारी अर्ज दाखल', icon:'📝', order:3, exp:'उमेदवार नामांकन भरतात.' },
      { id:4, label:'प्रचार सुरू', icon:'📣', order:4, exp:'उमेदवार मतदारांपर्यंत पोहोचतात.' },
      { id:5, label:'मतदान', icon:'🗳️', order:5, exp:'मतदारांचे मतदान.' },
      { id:6, label:'मतमोजणी व निकाल', icon:'🏆', order:6, exp:'मते मोजून विजेता घोषित.' }
    ]
  },
  hi: {
    title: 'चुनाव टाइमलाइन', subtitle: 'क्रम लगाएं!',
    intro: 'चुनाव प्रक्रिया के चरणों को सही क्रम में लगाएं।',
    submit: 'क्रम जांचें', restart: 'फिर प्रयास करें', perfect: '🎉 बिल्कुल सही क्रम!',
    stages: [
      { id:1, label:'चुनाव आयोग की घोषणा', icon:'📢', order:1, exp:'ECI चुनाव की तारीखें घोषित करता है।' },
      { id:2, label:'आदर्श आचार संहिता लागू', icon:'📜', order:2, exp:'घोषणा से MCC लागू होती है।' },
      { id:3, label:'नामांकन पत्र दाखिल', icon:'📝', order:3, exp:'उम्मीदवार नामांकन भरते हैं।' },
      { id:4, label:'प्रचार शुरू', icon:'📣', order:4, exp:'उम्मीदवार मतदाताओं तक पहुंचते हैं।' },
      { id:5, label:'मतदान', icon:'🗳️', order:5, exp:'मतदाता वोट देते हैं।' },
      { id:6, label:'मतगणना और परिणाम', icon:'🏆', order:6, exp:'वोट गिने जाते हैं, विजेता घोषित।' }
    ]
  },
  en: {
    title: 'Election Timeline', subtitle: 'Sort in order!',
    intro: 'Arrange the election process stages in the correct order.',
    submit: 'Check Order', restart: 'Try Again', perfect: '🎉 Perfect! Correct order!',
    stages: [
      { id:1, label:'Election Commission Announcement', icon:'📢', order:1, exp:'ECI announces election dates and schedule.' },
      { id:2, label:'Model Code of Conduct Enforced', icon:'📜', order:2, exp:'MCC comes into effect from the date of announcement.' },
      { id:3, label:'Filing of Nominations', icon:'📝', order:3, exp:'Candidates file their nomination papers.' },
      { id:4, label:'Election Campaigning', icon:'📣', order:4, exp:'Candidates reach out to voters.' },
      { id:5, label:'Polling Day', icon:'🗳️', order:5, exp:'Voters cast their votes.' },
      { id:6, label:'Vote Counting & Results', icon:'🏆', order:6, exp:'Votes are counted and winner declared.' }
    ]
  }
};

// Map existing game data into CONTENT[lang].games
['mr', 'hi', 'en'].forEach(lang => {
  if (!CONTENT[lang].games) CONTENT[lang].games = {};
  
  CONTENT[lang].games.voting_day_title = GAME_VOTING_DAY_DATA[lang].title;
  CONTENT[lang].games.voting_day_decisions = GAME_VOTING_DAY_DATA[lang].decisions.map(d => ({
    q: d.q,
    options: d.opts,
    correct: d.ans,
    explanation: d.exp
  }));
  
  CONTENT[lang].games.spot_title = GAME_SPOT_DATA[lang].title;
  CONTENT[lang].games.spot_scenarios = GAME_SPOT_DATA[lang].scenarios.map(s => ({
    text: s.scene,
    answer: s.isViolation ? 'violation' : 'allowed',
    explanation: s.exp
  }));
  
  CONTENT[lang].games.timeline_title = GAME_TIMELINE_DATA[lang].title;
  CONTENT[lang].games.timeline_stages = GAME_TIMELINE_DATA[lang].stages;
});
