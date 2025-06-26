// Complete JAMB 2000 Use of English Question Set
import { JambExamRow } from "../datadefinition";

export const JambEnglish2000: JambExamRow = {
  exam: "JAMB 2000 English Language",
  year: 2000,
  subject: "English Language",
  total_questions: 60,
  time_allowed: "2 hours",
  instruction: "Answer all questions. Each question is followed by four options lettered A to D. Find the correct option for each question.",
  questions: [
    {
      question_number: 1,
      type: "phonetics",
      question: "Choose the option that has the same vowel sound as the one represented by the letters underlined in 'boat'",
      options: {
        A: "board",
        B: "bought", 
        C: "go",
        D: "glory"
      },
      correct_answer: "C",
      explanation: "The vowel sound in 'boat' /oʊ/ is similar to 'go'"
    },
    {
      question_number: 2,
      type: "phonetics",
      question: "Choose the option that has the same vowel sound as the one represented by the letters underlined in 'air'",
      options: {
        A: "here",
        B: "care",
        C: "ear", 
        D: "are"
      },
      correct_answer: "B",
      explanation: "The vowel sound in 'air' /eə/ is similar to 'care'"
    },
    {
      question_number: 3,
      type: "phonetics", 
      question: "Choose the option that has the same vowel sound as the one represented by the letters underlined in 'pleasure'",
      options: {
        A: "bread",
        B: "break",
        C: "bean",
        D: "beat"
      },
      correct_answer: "A",
      explanation: "The vowel sound in 'pleasure' /e/ is similar to 'bread'"
    },
    {
      question_number: 4,
      type: "phonetics",
      question: "Choose the option that has the same vowel sound as the one represented by the letters underlined in 'thunder'",
      options: {
        A: "wonder",
        B: "wander", 
        C: "under",
        D: "defer"
      },
      correct_answer: "C",
      explanation: "The vowel sound in 'thunder' /ʌ/ is similar to 'under'"
    },
    {
      question_number: 5,
      type: "phonetics",
      question: "Choose the option that has the same vowel sound as the one represented by the letters underlined in 'tear' (noun)",
      options: {
        A: "bear",
        B: "beer",
        C: "tier",
        D: "hear"
      },
      correct_answer: "D",
      explanation: "The vowel sound in 'tear' (noun) /ɪə/ is similar to 'hear'"
    },
    {
      question_number: 6,
      type: "stress",
      question: "Choose the word with the correct stress pattern: photograph",
      options: {
        A: "PHO-to-graph",
        B: "pho-TO-graph",
        C: "pho-to-GRAPH",
        D: "PHO-TO-graph"
      },
      correct_answer: "A",
      explanation: "The stress in 'photograph' is on the first syllable: PHO-to-graph"
    },
    {
      question_number: 7,
      type: "stress",
      question: "Choose the word with the correct stress pattern: fantastic",
      options: {
        A: "FAN-tas-tic",
        B: "fan-TAS-tic", 
        C: "fan-tas-TIC",
        D: "FAN-TAS-tic"
      },
      correct_answer: "B",
      explanation: "The stress in 'fantastic' is on the second syllable: fan-TAS-tic"
    },
    {
      question_number: 8,
      type: "stress",
      question: "Choose the word with the correct stress pattern: computer",
      options: {
        A: "COM-pu-ter",
        B: "com-PU-ter",
        C: "com-pu-TER",
        D: "COM-PU-ter"
      },
      correct_answer: "B",
      explanation: "The stress in 'computer' is on the second syllable: com-PU-ter"
    },
    {
      question_number: 9,
      type: "grammar",
      question: "Choose the most appropriate option to fill the gap: The students have been _____ for the examination.",
      options: {
        A: "preparing",
        B: "prepared",
        C: "prepare",
        D: "preparation"
      },
      correct_answer: "A",
      explanation: "Present perfect continuous tense requires 'preparing'"
    },
    {
      question_number: 10,
      type: "grammar",
      question: "Fill the gap: Neither John nor his friends _____ present at the meeting.",
      options: {
        A: "was",
        B: "were",
        C: "is",
        D: "are"
      },
      correct_answer: "B",
      explanation: "With 'neither...nor', the verb agrees with the closer noun (friends - plural)"
    },
    {
      question_number: 11,
      type: "grammar",
      question: "Choose the correct option: I would rather you _____ now.",
      options: {
        A: "leave",
        B: "left",
        C: "leaving",
        D: "to leave"
      },
      correct_answer: "B",
      explanation: "'Would rather' is followed by past tense form"
    },
    {
      question_number: 12,
      type: "grammar",
      question: "Choose the correct option: The committee _____ its decision yesterday.",
      options: {
        A: "announce",
        B: "announced",
        C: "announces",
        D: "announcing"
      },
      correct_answer: "B",
      explanation: "Past tense 'announced' is correct for yesterday"
    },
    {
      question_number: 13,
      type: "grammar",
      question: "Fill the gap: If I _____ you, I would accept the offer.",
      options: {
        A: "am",
        B: "was",
        C: "were",
        D: "will be"
      },
      correct_answer: "C",
      explanation: "Subjunctive mood uses 'were' in conditional statements"
    },
    {
      question_number: 14,
      type: "grammar",
      question: "Choose the correct option: She has been working here _____ 2018.",
      options: {
        A: "for",
        B: "since",
        C: "from",
        D: "during"
      },
      correct_answer: "B",
      explanation: "'Since' is used with specific time points"
    },
    {
      question_number: 15,
      type: "grammar",
      question: "Fill the gap: The information _____ very useful.",
      options: {
        A: "are",
        B: "is",
        C: "were",
        D: "have"
      },
      correct_answer: "B",
      explanation: "'Information' is uncountable and singular, takes 'is'"
    },
    {
      question_number: 16,
      type: "grammar",
      question: "Choose the correct option: Each of the boys _____ present.",
      options: {
        A: "are",
        B: "were",
        C: "is",
        D: "have been"
      },
      correct_answer: "C",
      explanation: "'Each' is singular and takes 'is'"
    },
    {
      question_number: 17,
      type: "vocabulary",
      question: "Despite his laxity in other matters, Ojo's father drew the line at truancy. 'Drew the line at' means:",
      options: {
        A: "encouraged",
        B: "refused to tolerate",
        C: "supported",
        D: "ignored"
      },
      correct_answer: "B",
      explanation: "'Drew the line at' means refused to tolerate or accept"
    },
    {
      question_number: 18,
      type: "vocabulary",
      question: "The string was taut. 'Taut' means:",
      options: {
        A: "loose",
        B: "tight",
        C: "broken",
        D: "twisted"
      },
      correct_answer: "B",
      explanation: "'Taut' means tight or stretched"
    },
    {
      question_number: 19,
      type: "vocabulary",
      question: "We intend to make the reception a diurnal event. 'Diurnal' means:",
      options: {
        A: "evening",
        B: "night",
        C: "daily",
        D: "weekly"
      },
      correct_answer: "C",
      explanation: "'Diurnal' means occurring during the day or daily"
    },
    {
      question_number: 20,
      type: "vocabulary",
      question: "The politician has turned renegade. 'Renegade' means:",
      options: {
        A: "loyal supporter",
        B: "traitor",
        C: "leader",
        D: "follower"
      },
      correct_answer: "B",
      explanation: "A 'renegade' is someone who deserts or betrays their cause"
    },
    {
      question_number: 21,
      type: "vocabulary",
      question: "The witness gave a lucid account of the incident. 'Lucid' means:",
      options: {
        A: "confused",
        B: "clear",
        C: "false",
        D: "brief"
      },
      correct_answer: "B",
      explanation: "'Lucid' means clear and easily understood"
    },
    {
      question_number: 22,
      type: "vocabulary",
      question: "His comment was quite apt. 'Apt' means:",
      options: {
        A: "inappropriate",
        B: "suitable",
        C: "lengthy",
        D: "harsh"
      },
      correct_answer: "B",
      explanation: "'Apt' means suitable or appropriate"
    },
    {
      question_number: 23,
      type: "vocabulary",
      question: "The judge gave a stern warning. 'Stern' means:",
      options: {
        A: "gentle",
        B: "soft",
        C: "strict",
        D: "kind"
      },
      correct_answer: "C",
      explanation: "'Stern' means strict or severe"
    },
    {
      question_number: 24,
      type: "vocabulary",
      question: "She made a candid confession. 'Candid' means:",
      options: {
        A: "false",
        B: "honest",
        C: "hidden",
        D: "partial"
      },
      correct_answer: "B",
      explanation: "'Candid' means honest and straightforward"
    },
    {
      question_number: 25,
      type: "sentence_interpretation",
      question: "Choose the interpretation that is most suitable for this sentence: 'Hardly had the chairman sat down when the meeting began.'",
      options: {
        A: "The chairman sat down after the meeting began",
        B: "The meeting began immediately after the chairman sat down",
        C: "The chairman could hardly sit down",
        D: "The meeting was hard to begin"
      },
      correct_answer: "B",
      explanation: "'Hardly had...when' indicates something happened immediately after"
    },
    {
      question_number: 26,
      type: "sentence_interpretation",
      question: "What does this sentence mean: 'The less you say about it, the better for you.'",
      options: {
        A: "You should say more about it",
        B: "It's better to remain silent about it",
        C: "Say something good about it",
        D: "The topic is not important"
      },
      correct_answer: "B",
      explanation: "The sentence suggests silence is the best option"
    },
    {
      question_number: 27,
      type: "cloze_test",
      question: "To check desertification in the arid zones, _____ trees should be planted.",
      options: {
        A: "much",
        B: "many",
        C: "more",
        D: "most"
      },
      correct_answer: "C",
      explanation: "'More' is appropriate for suggesting additional trees"
    },
    {
      question_number: 28,
      type: "cloze_test",
      question: "I like the character that played the role of a political _____ at the last convention.",
      options: {
        A: "actor",
        B: "activist",
        C: "leader",
        D: "speaker"
      },
      correct_answer: "B",
      explanation: "Political activist fits the context of a convention role"
    },
    {
      question_number: 29,
      type: "cloze_test",
      question: "The weather was so _____ that we had to cancel the picnic.",
      options: {
        A: "good",
        B: "fine",
        C: "bad",
        D: "nice"
      },
      correct_answer: "C",
      explanation: "Only 'bad' weather would cause cancellation of a picnic"
    },
    {
      question_number: 30,
      type: "cloze_test",
      question: "She _____ her best dress for the wedding ceremony.",
      options: {
        A: "put on",
        B: "wore",
        C: "dressed",
        D: "carried"
      },
      correct_answer: "B",
      explanation: "'Wore' is the correct past tense for having clothes on"
    },
    {
      question_number: 31,
      type: "reading_comprehension",
      question: "According to the passage, what kills more teenagers than firearms?",
      options: {
        A: "Disease",
        B: "Motor vehicle accidents",
        C: "Suicide",
        D: "Drug overdose"
      },
      correct_answer: "B",
      explanation: "The passage states 'Only motor vehicle accidents kill more teenagers than firearms'",
      passage: "Time was when boys used to point toy guns and say 'Bang'. Now, they aim real guns and shoot one another. Nearly 4,200 teenagers were killed by firearms in 1990. Only motor vehicle accidents kill more teenagers than firearms and the firearms figures are rising. The chance that a black male between the ages of 15 and 19 will be killed by a gun has almost tripled since 1985 and almost doubled for white males, according to the National Centre for Health Statistics."
    },
    {
      question_number: 32,
      type: "reading_comprehension",
      question: "The statistics show that since 1985, the chance of gun violence has:",
      options: {
        A: "Decreased for all groups",
        B: "Remained the same",
        C: "Increased significantly",
        D: "Only affected one group"
      },
      correct_answer: "C",
      explanation: "The passage indicates significant increases - tripled for black males, doubled for white males",
      passage: "Time was when boys used to point toy guns and say 'Bang'. Now, they aim real guns and shoot one another. Nearly 4,200 teenagers were killed by firearms in 1990. Only motor vehicle accidents kill more teenagers than firearms and the firearms figures are rising. The chance that a black male between the ages of 15 and 19 will be killed by a gun has almost tripled since 1985 and almost doubled for white males, according to the National Centre for Health Statistics."
    },
    {
      question_number: 33,
      type: "reading_comprehension",
      question: "According to the passage, how many teenagers were killed by firearms in 1990?",
      options: {
        A: "4,200",
        B: "4,000",
        C: "5,200",
        D: "3,200"
      },
      correct_answer: "A",
      explanation: "The passage clearly states 'Nearly 4,200 teenagers were killed by firearms in 1990'",
      passage: "Time was when boys used to point toy guns and say 'Bang'. Now, they aim real guns and shoot one another. Nearly 4,200 teenagers were killed by firearms in 1990. Only motor vehicle accidents kill more teenagers than firearms and the firearms figures are rising. The chance that a black male between the ages of 15 and 19 will be killed by a gun has almost tripled since 1985 and almost doubled for white males, according to the National Centre for Health Statistics."
    },
    {
      question_number: 34,
      type: "reading_comprehension",
      question: "The passage suggests a question about:",
      options: {
        A: "Gun control laws",
        B: "Television violence and real violence",
        C: "Motor vehicle safety",
        D: "Youth employment"
      },
      correct_answer: "B",
      explanation: "The passage questions whether less TV violence would reduce real violence",
      passage: "Who could disagree with Health and Human services secretary, Donna Shalala, when she pronounced these statistics 'frightening and intolerable'? In the shameful light of this 'waste of young lives', an often-asked question seems urgently due to be raised again. Would less violence on television make violence in actual life less normal, less accepted, less horrifying?"
    },
    {
      question_number: 35,
      type: "reading_comprehension",
      question: "Donna Shalala described the statistics as:",
      options: {
        A: "Acceptable",
        B: "Frightening and intolerable", 
        C: "Surprising",
        D: "Expected"
      },
      correct_answer: "B",
      explanation: "The passage directly quotes Shalala calling the statistics 'frightening and intolerable'",
      passage: "Who could disagree with Health and Human services secretary, Donna Shalala, when she pronounced these statistics 'frightening and intolerable'? In the shameful light of this 'waste of young lives', an often-asked question seems urgently due to be raised again. Would less violence on television make violence in actual life less normal, less accepted, less horrifying?"
    },
    {
      question_number: 36,
      type: "literary_devices",
      question: "In the sentence 'The classroom was a zoo', what literary device is used?",
      options: {
        A: "Simile",
        B: "Metaphor",
        C: "Personification",
        D: "Alliteration"
      },
      correct_answer: "B",
      explanation: "Metaphor directly compares two things without using 'like' or 'as'"
    },
    {
      question_number: 37,
      type: "literary_devices",
      question: "What figure of speech is used in 'The wind whispered through the trees'?",
      options: {
        A: "Metaphor",
        B: "Simile",
        C: "Personification",
        D: "Hyperbole"
      },
      correct_answer: "C",
      explanation: "Personification gives human qualities (whispering) to non-human things"
    },
    {
      question_number: 38,
      type: "synonyms_antonyms",
      question: "Choose the word that is opposite in meaning to 'beautiful':",
      options: {
        A: "Pretty",
        B: "Ugly",
        C: "Nice",
        D: "Lovely"
      },
      correct_answer: "B",
      explanation: "'Ugly' is the direct opposite of 'beautiful'"
    },
    {
      question_number: 39,
      type: "synonyms_antonyms",
      question: "Choose the word closest in meaning to 'enormous':",
      options: {
        A: "Small",
        B: "Tiny",
        C: "Huge",
        D: "Little"
      },
      correct_answer: "C",
      explanation: "'Huge' is closest in meaning to 'enormous'"
    },
    {
      question_number: 40,
      type: "idioms_expressions",
      question: "What does 'break the ice' mean?",
      options: {
        A: "To destroy something",
        B: "To start a conversation",
        C: "To be very cold",
        D: "To make someone angry"
      },
      correct_answer: "B",
      explanation: "'Break the ice' means to initiate conversation or interaction"
    },
    {
      question_number: 41,
      type: "idioms_expressions",
      question: "What does 'piece of cake' mean?",
      options: {
        A: "Something difficult",
        B: "Something easy",
        C: "Food item",
        D: "Something expensive"
      },
      correct_answer: "B",
      explanation: "'Piece of cake' means something very easy to do"
    },
    {
      question_number: 42,
      type: "grammar",
      question: "Choose the correct pronoun: _____ of the students passed the examination.",
      options: {
        A: "All",
        B: "Every",
        C: "Each",
        D: "Any"
      },
      correct_answer: "A",
      explanation: "'All' is correct when referring to the entire group"
    },
    {
      question_number: 43,
      type: "grammar",
      question: "Fill the gap: The boy, together with his friends, _____ coming.",
      options: {
        A: "are",
        B: "is",
        C: "were",
        D: "have"
      },
      correct_answer: "B",
      explanation: "The subject 'boy' is singular, so 'is' is correct"
    },
    {
      question_number: 44,
      type: "grammar",
      question: "Choose the correct form: I wish I _____ there yesterday.",
      options: {
        A: "was",
        B: "were",
        C: "had been",
        D: "have been"
      },
      correct_answer: "C",
      explanation: "Past perfect 'had been' is used for wishes about the past"
    },
    {
      question_number: 45,
      type: "grammar",
      question: "Fill the gap: By the time we arrived, the concert _____.",
      options: {
        A: "ended",
        B: "has ended",
        C: "had ended",
        D: "ends"
      },
      correct_answer: "C",
      explanation: "Past perfect 'had ended' shows action completed before another past action"
    },
    {
      question_number: 46,
      type: "punctuation",
      question: "Choose the correctly punctuated sentence:",
      options: {
        A: "What a beautiful day it is.",
        B: "What a beautiful day it is!",
        C: "What a beautiful day it is?",
        D: "What a beautiful day it is;"
      },
      correct_answer: "B",
      explanation: "Exclamatory sentences end with exclamation marks"
    },
    {
      question_number: 47,
      type: "punctuation",
      question: "Choose the correctly punctuated sentence:",
      options: {
        A: "John said I am coming",
        B: "John said, I am coming",
        C: "John said, 'I am coming'",
        D: "John said 'I am coming,"
      },
      correct_answer: "C",
      explanation: "Direct speech needs quotation marks and proper punctuation"
    },
    {
      question_number: 48,
      type: "word_formation",
      question: "What is the noun form of 'generous'?",
      options: {
        A: "Generously",
        B: "Generosity",
        C: "Generate",
        D: "Generation"
      },
      correct_answer: "B",
      explanation: "'Generosity' is the noun form of the adjective 'generous'"
    },
    {
      question_number: 49,
      type: "word_formation",
      question: "What is the adverb form of 'quick'?",
      options: {
        A: "Quickness",
        B: "Quicken",
        C: "Quickly",
        D: "Quicker"
      },
      correct_answer: "C",
      explanation: "'Quickly' is the adverb form of 'quick'"
    },
    {
      question_number: 50,
      type: "active_passive_voice",
      question: "Change to passive voice: 'The teacher teaches the students'",
      options: {
        A: "The students are taught by the teacher",
        B: "The students teach the teacher",
        C: "The teacher is taught by the students",
        D: "The students were taught by the teacher"
      },
      correct_answer: "A",
      explanation: "Present tense active becomes present tense passive"
    },
    {
      question_number: 51,
      type: "active_passive_voice",
      question: "Change to active voice: 'The book was written by the author'",
      options: {
        A: "The book writes the author",
        B: "The author writes the book",
        C: "The author wrote the book",
        D: "The author was writing the book"
      },
      correct_answer: "C",
      explanation: "Past tense passive becomes past tense active"
    },
    {
      question_number: 52,
      type: "reported_speech",
      question: "Change to reported speech: He said, 'I am busy'",
      options: {
        A: "He said that he is busy",
        B: "He said that he was busy",
        C: "He said he busy",
        D: "He said I am busy"
      },
      correct_answer: "B",
      explanation: "Present tense changes to past tense in reported speech"
    },
    {
      question_number: 53,
      type: "reported_speech",
      question: "Change to direct speech: She said that she would come",
      options: {
        A: "She said, 'I will come'",
        B: "She said, 'She will come'",
        C: "She said, 'I would come'",
        D: "She said, 'She would come'"
      },
      correct_answer: "A",
      explanation: "'Would' in reported speech becomes 'will' in direct speech"
    },
    {
      question_number: 54,
      type: "one_word_substitution",
      question: "One word for 'a person who studies stars and planets':",
      options: {
        A: "Geologist",
        B: "Astronomer",
        C: "Biologist",
        D: "Archaeologist"
      },
      correct_answer: "B",
      explanation: "An astronomer studies celestial objects"
    },
    {
      question_number: 55,
      type: "one_word_substitution",
      question: "One word for 'fear of heights':",
      options: {
        A: "Claustrophobia",
        B: "Agoraphobia",
        C: "Acrophobia",
        D: "Hydrophobia"
      },
      correct_answer: "C",
      explanation: "Acrophobia is the fear of heights"
    },
    {
      question_number: 56,
      type: "spelling",
      question: "Choose the correctly spelled word:",
      options: {
        A: "Occassion",
        B: "Occasion",
        C: "Ocasion",
        D: "Occation"
      },
      correct_answer: "B",
      explanation: "The correct spelling is 'occasion' with double 'c' and single 's'"
    },
    {
      question_number: 57,
      type: "spelling",
      question: "Choose the correctly spelled word:",
      options: {
        A: "Necessary",
        B: "Neccessary",
        C: "Necesary",
        D: "Neccesary"
      },
      correct_answer: "A",
      explanation: "The correct spelling is 'necessary' with one 'c' and double 's'"
    },
    {
      question_number: 58,
      type: "paragraph_organization",
      question: "Which sentence would be the best topic sentence for a paragraph about pollution?",
      options: {
        A: "Many cities are polluted.",
        B: "Pollution is a major environmental problem affecting our planet.",
        C: "Cars produce smoke.",
        D: "We should stop pollution."
      },
      correct_answer: "B",
      explanation: "A good topic sentence introduces the main idea comprehensively"
    },
    {
      question_number: 59,
      type: "paragraph_organization",
      question: "Which transition word shows contrast?",
      options: {
        A: "Furthermore",
        B: "However",
        C: "Therefore",
        D: "Moreover"
      },
      correct_answer: "B",
      explanation: "'However' is used to show contrast or opposition"
    },
    {
      question_number: 60,
      type: "general_comprehension",
      question: "Choose the most logical conclusion: 'All students in the class passed the test. Mary is a student in the class.'",
      options: {
        A: "Mary failed the test",
        B: "Mary passed the test",
        C: "Mary didn't take the test",
        D: "Mary teaches the class"
      },
      correct_answer: "B",
      explanation: "If all students passed and Mary is a student, then Mary passed"
    }
  ]
};

// Export types for use in other modules

// Array of all exam rows for easy iteration
export const AllJambEnglishExams: JambExamRow[] = [
  JambEnglish2000
];

// Export individual years for specific imports
export default JambEnglish2000;