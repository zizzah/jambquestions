interface QuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}

// Valid answer choices
type AnswerChoice = 'A' | 'B' | 'C' | 'D';

// Individual CRK question interface
interface CRKQuestion {
  id: string;
  year: string;
  subject: string;
  type: string;
  question: string;
  options: QuestionOptions;
  answer: AnswerChoice;
  explanation: string;
}

// Array of CRK questions
type CRKQuizData = CRKQuestion[];



export const crk: CRKQuizData = [
  {
    "id": "1",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the first king of Israel according to the Old Testament?",
    "options": {
      "A": "Saul",
      "B": "David",
      "C": "Solomon",
      "D": "Samuel"
    },
    "answer": "A",
    "explanation": "Saul was anointed as the first king by Samuel, as recorded in 1 Samuel 10."
  },
  {
    "id": "2",
    "year": "2010",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the mountain where Moses received the Ten Commandments?",
    "options": {
      "A": "Sinai",
      "B": "Horeb",
      "C": "Zion",
      "D": "Carmel"
    },
    "answer": "A",
    "explanation": "Mount Sinai is where God gave Moses the Ten Commandments (Exodus 19–20)."
  },
  {
    "id": "3",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who led the Israelites into the Promised Land after Moses' death?",
    "options": {
      "A": "Aaron",
      "B": "Joshua",
      "C": "Caleb",
      "D": "Gideon"
    },
    "answer": "B",
    "explanation": "Joshua succeeded Moses and led the Israelites into Canaan (Joshua 1)."
  },
  {
    "id": "4",
    "year": "2008",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the sign of God’s covenant with Noah?",
    "options": {
      "A": "Rainbow",
      "B": "Ark",
      "C": "Dove",
      "D": "Altar"
    },
    "answer": "A",
    "explanation": "The rainbow was a sign of God’s promise never to destroy the earth with a flood again (Genesis 9:13)."
  },
  {
    "id": "5",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was sold into slavery by his brothers?",
    "options": {
      "A": "Isaac",
      "B": "Jacob",
      "C": "Joseph",
      "D": "Esau"
    },
    "answer": "C",
    "explanation": "Joseph was sold into slavery by his brothers due to jealousy (Genesis 37)."
  },
  {
    "id": "6",
    "year": "2003",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What did God create on the first day according to Genesis?",
    "options": {
      "A": "Light",
      "B": "Sky",
      "C": "Land",
      "D": "Animals"
    },
    "answer": "A",
    "explanation": "On the first day, God created light and separated it from darkness (Genesis 1:3–5)."
  },
  {
    "id": "7",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the mother of Isaac?",
    "options": {
      "A": "Rebekah",
      "B": "Sarah",
      "C": "Rachel",
      "D": "Leah"
    },
    "answer": "B",
    "explanation": "Sarah, Abraham’s wife, gave birth to Isaac in her old age (Genesis 21:1–3)."
  },
  {
    "id": "8",
    "year": "2007",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the prophet who confronted Ahab and Jezebel?",
    "options": {
      "A": "Elijah",
      "B": "Elisha",
      "C": "Isaiah",
      "D": "Jeremiah"
    },
    "answer": "A",
    "explanation": "Elijah challenged King Ahab and Queen Jezebel over idolatry (1 Kings 18)."
  },
  {
    "id": "9",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the punishment for Adam and Eve’s disobedience in Eden?",
    "options": {
      "A": "Flood",
      "B": "Exile",
      "C": "Death",
      "D": "Curse"
    },
    "answer": "D",
    "explanation": "God pronounced curses on Adam, Eve, and the serpent after their disobedience (Genesis 3:16–19)."
  },
  {
    "id": "10",
    "year": "2020",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the father of the twelve tribes of Israel?",
    "options": {
      "A": "Abraham",
      "B": "Isaac",
      "C": "Jacob",
      "D": "Joseph"
    },
    "answer": "C",
    "explanation": "Jacob, also called Israel, had twelve sons who became the patriarchs of the tribes (Genesis 35:22–26)."
  },
  {
    "id": "11",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What did God instruct Abraham to sacrifice before providing a ram?",
    "options": {
      "A": "Isaac",
      "B": "Ishmael",
      "C": "Jacob",
      "D": "Esau"
    },
    "answer": "A",
    "explanation": "God tested Abraham by asking him to sacrifice Isaac (Genesis 22)."
  },
  {
    "id": "12",
    "year": "2016",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the wife of King David who was previously married to Nabal?",
    "options": {
      "A": "Abigail",
      "B": "Bathsheba",
      "C": "Michal",
      "D": "Tamar"
    },
    "answer": "A",
    "explanation": "Abigail became David’s wife after Nabal’s death (1 Samuel 25)."
  },
  {
    "id": "13",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the giant killed by David?",
    "options": {
      "A": "Goliath",
      "B": "Samson",
      "C": "Absalom",
      "D": "Saul"
    },
    "answer": "A",
    "explanation": "David defeated Goliath with a sling and stone (1 Samuel 17)."
  },
  {
    "id": "14",
    "year": "2021",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Which prophet was taken to heaven in a chariot of fire?",
    "options": {
      "A": "Elisha",
      "B": "Elijah",
      "C": "Isaiah",
      "D": "Ezekiel"
    },
    "answer": "B",
    "explanation": "Elijah was taken to heaven in a whirlwind with a chariot of fire (2 Kings 2:11)."
  },
  {
    "id": "15",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the city where Jonah was sent to preach?",
    "options": {
      "A": "Nineveh",
      "B": "Jericho",
      "C": "Jerusalem",
      "D": "Bethlehem"
    },
    "answer": "A",
    "explanation": "Jonah was sent to preach repentance to Nineveh (Jonah 1:2)."
  },
  {
    "id": "16",
    "year": "2006",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the father-in-law of Moses?",
    "options": {
      "A": "Aaron",
      "B": "Jethro",
      "C": "Amram",
      "D": "Eleazar"
    },
    "answer": "B",
    "explanation": "Jethro, a Midianite priest, was Moses’ father-in-law (Exodus 3:1)."
  },
  {
    "id": "17",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the sea parted for the Israelites’ escape from Egypt?",
    "options": {
      "A": "Red Sea",
      "B": "Dead Sea",
      "C": "Sea of Galilee",
      "D": "Jordan River"
    },
    "answer": "A",
    "explanation": "God parted the Red Sea to allow the Israelites to escape Pharaoh’s army (Exodus 14)."
  },
  {
    "id": "18",
    "year": "2004",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the first high priest of Israel?",
    "options": {
      "A": "Moses",
      "B": "Aaron",
      "C": "Samuel",
      "D": "Eli"
    },
    "answer": "B",
    "explanation": "Aaron, Moses’ brother, was appointed as the first high priest (Exodus 28)."
  },
  {
    "id": "19",
    "year": "2017",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the judge who defeated the Midianites with 300 men?",
    "options": {
      "A": "Gideon",
      "B": "Samson",
      "C": "Deborah",
      "D": "Barak"
    },
    "answer": "A",
    "explanation": "Gideon defeated the Midianites using a small army, as directed by God (Judges 7)."
  },
  {
    "id": "20",
    "year": "2013",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the mother of Jesus?",
    "options": {
      "A": "Mary",
      "B": "Martha",
      "C": "Elizabeth",
      "D": "Anna"
    },
    "answer": "A",
    "explanation": "Mary was chosen to be the mother of Jesus through the Holy Spirit (Luke 1:26–38)."
  },
  {
    "id": "21",
    "year": "2001",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the occupation of Matthew before he became a disciple?",
    "options": {
      "A": "Fisherman",
      "B": "Tax collector",
      "C": "Carpenter",
      "D": "Shepherd"
    },
    "answer": "B",
    "explanation": "Matthew was a tax collector when Jesus called him to follow (Matthew 9:9)."
  },
  {
    "id": "22",
    "year": "2022",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Where was Jesus born?",
    "options": {
      "A": "Nazareth",
      "B": "Jerusalem",
      "C": "Bethlehem",
      "D": "Capernaum"
    },
    "answer": "C",
    "explanation": "Jesus was born in Bethlehem, as prophesied in Micah 5:2 (Matthew 2:1)."
  },
  {
    "id": "23",
    "year": "2000",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the wife of Isaac?",
    "options": {
      "A": "Rebekah",
      "B": "Rachel",
      "C": "Leah",
      "D": "Sarah"
    },
    "answer": "A",
    "explanation": "Rebekah was chosen as Isaac’s wife (Genesis 24)."
  },
  {
    "id": "24",
    "year": "2023",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who baptized Jesus in the Jordan River?",
    "options": {
      "A": "Peter",
      "B": "John the Baptist",
      "C": "Paul",
      "D": "James"
    },
    "answer": "B",
    "explanation": "John the Baptist baptized Jesus, proclaiming Him as the Messiah (Matthew 3:13–17)."
  },
  {
    "id": "25",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of Jacob’s brother?",
    "options": {
      "A": "Joseph",
      "B": "Esau",
      "C": "Benjamin",
      "D": "Reuben"
    },
    "answer": "B",
    "explanation": "Esau was Jacob’s twin brother (Genesis 25:24–26)."
  },
  {
    "id": "26",
    "year": "2010",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple betrayed Jesus for thirty pieces of silver?",
    "options": {
      "A": "Peter",
      "B": "Judas Iscariot",
      "C": "Thomas",
      "D": "John"
    },
    "answer": "B",
    "explanation": "Judas Iscariot betrayed Jesus to the authorities (Matthew 26:14–16)."
  },
  {
    "id": "27",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that anointed David as king?",
    "options": {
      "A": "Samuel",
      "B": "Nathan",
      "C": "Elijah",
      "D": "Gad"
    },
    "answer": "A",
    "explanation": "Samuel anointed David as king of Israel (1 Samuel 16:13)."
  },
  {
    "id": "28",
    "year": "2008",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the first miracle performed by Jesus?",
    "options": {
      "A": "Healing a blind man",
      "B": "Turning water into wine",
      "C": "Walking on water",
      "D": "Feeding the 5,000"
    },
    "answer": "B",
    "explanation": "Jesus turned water into wine at the wedding in Cana (John 2:1–11)."
  },
  {
    "id": "29",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the river where Moses was found in a basket?",
    "options": {
      "A": "Jordan",
      "B": "Nile",
      "C": "Euphrates",
      "D": "Tigris"
    },
    "answer": "B",
    "explanation": "Moses was placed in a basket in the Nile River (Exodus 2:3)."
  },
  {
    "id": "30",
    "year": "2003",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the Roman governor who sentenced Jesus to death?",
    "options": {
      "A": "Herod",
      "B": "Pilate",
      "C": "Caesar",
      "D": "Felix"
    },
    "answer": "B",
    "explanation": "Pontius Pilate was the governor who sentenced Jesus to crucifixion (Matthew 27:24–26)."
  },
  {
    "id": "31",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that built the first temple in Jerusalem?",
    "options": {
      "A": "Saul",
      "B": "David",
      "C": "Solomon",
      "D": "Hezekiah"
    },
    "answer": "C",
    "explanation": "Solomon built the first temple in Jerusalem (1 Kings 6)."
  },
  {
    "id": "32",
    "year": "2007",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which apostle was known as the 'doubting' disciple?",
    "options": {
      "A": "Peter",
      "B": "Thomas",
      "C": "James",
      "D": "Andrew"
    },
    "answer": "B",
    "explanation": "Thomas doubted Jesus’ resurrection until he saw Him (John 20:24–29)."
  },
  {
    "id": "33",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the Philistine god whose temple Samson destroyed?",
    "options": {
      "A": "Baal",
      "B": "Dagon",
      "C": "Molech",
      "D": "Asherah"
    },
    "answer": "B",
    "explanation": "Samson destroyed the temple of Dagon, killing many Philistines (Judges 16:23–30)."
  },
  {
    "id": "34",
    "year": "2020",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the name of the man who helped carry Jesus’ cross?",
    "options": {
      "A": "Simon of Cyrene",
      "B": "Joseph of Arimathea",
      "C": "Nicodemus",
      "D": "Lazarus"
    },
    "answer": "A",
    "explanation": "Simon of Cyrene was compelled to carry Jesus’ cross (Mark 15:21)."
  },
  {
    "id": "35",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that predicted a virgin would bear a son called Immanuel?",
    "options": {
      "A": "Jeremiah",
      "B": "Isaiah",
      "C": "Ezekiel",
      "D": "Daniel"
    },
    "answer": "B",
    "explanation": "Isaiah prophesied about the birth of Immanuel (Isaiah 7:14)."
  },
  {
    "id": "36",
    "year": "2016",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was the site of Jesus’ crucifixion?",
    "options": {
      "A": "Nazareth",
      "B": "Jerusalem",
      "C": "Bethlehem",
      "D": "Capernaum"
    },
    "answer": "B",
    "explanation": "Jesus was crucified in Jerusalem (Matthew 27:33–35)."
  },
  {
    "id": "37",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the queen who visited Solomon?",
    "options": {
      "A": "Queen of Sheba",
      "B": "Jezebel",
      "C": "Esther",
      "D": "Bathsheba"
    },
    "answer": "A",
    "explanation": "The Queen of Sheba visited Solomon to test his wisdom (1 Kings 10:1–13)."
  },
  {
    "id": "38",
    "year": "2021",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the first martyr of the Christian church?",
    "options": {
      "A": "Stephen",
      "B": "James",
      "C": "Peter",
      "D": "Paul"
    },
    "answer": "A",
    "explanation": "Stephen was stoned to death for his faith (Acts 7:54–60)."
  },
  {
    "id": "39",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was thrown into a lions’ den for praying to God?",
    "options": {
      "A": "Daniel",
      "B": "Shadrach",
      "C": "Meshach",
      "D": "Abednego"
    },
    "answer": "A",
    "explanation": "Daniel was thrown into the lions’ den but was protected by God (Daniel 6)."
  },
  {
    "id": "40",
    "year": "2006",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable teaches about a man who helped a wounded stranger?",
    "options": {
      "A": "The Prodigal Son",
      "B": "The Good Samaritan",
      "C": "The Sower",
      "D": "The Lost Sheep"
    },
    "answer": "B",
    "explanation": "The Good Samaritan parable teaches about loving one’s neighbor (Luke 10:25–37)."
  },
  {
    "id": "41",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that committed suicide after being wounded in battle?",
    "options": {
      "A": "Saul",
      "B": "David",
      "C": "Ahab",
      "D": "Josiah"
    },
    "answer": "A",
    "explanation": "Saul killed himself after being wounded in battle (1 Samuel 31:4)."
  },
  {
    "id": "42",
    "year": "2004",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the sister of Lazarus?",
    "options": {
      "A": "Mary Magdalene",
      "B": "Martha",
      "C": "Joanna",
      "D": "Salome"
    },
    "answer": "B",
    "explanation": "Martha, along with her sister Mary, was a sister of Lazarus (John 11:1–2)."
  },
  {
    "id": "43",
    "year": "2017",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the city destroyed by fire along with Sodom?",
    "options": {
      "A": "Gomorrah",
      "B": "Jericho",
      "C": "Ai",
      "D": "Nineveh"
    },
    "answer": "A",
    "explanation": "Sodom and Gomorrah were destroyed by God for their wickedness (Genesis 19:24–25)."
  },
  {
    "id": "44",
    "year": "2013",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which apostle was originally called Saul?",
    "options": {
      "A": "Peter",
      "B": "Paul",
      "C": "Barnabas",
      "D": "Silas"
    },
    "answer": "B",
    "explanation": "Saul, a persecutor of Christians, became Paul after his conversion (Acts 9:1–19)."
  },
  {
    "id": "45",
    "year": "2001",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that married Gomer as a sign of Israel’s unfaithfulness?",
    "options": {
      "A": "Hosea",
      "B": "Joel",
      "C": "Amos",
      "D": "Micah"
    },
    "answer": "A",
    "explanation": "Hosea married Gomer as a symbol of God’s relationship with Israel (Hosea 1:2–3)."
  },
  {
    "id": "46",
    "year": "2022",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the name of the tax collector who climbed a tree to see Jesus?",
    "options": {
      "A": "Matthew",
      "B": "Zacchaeus",
      "C": "Levi",
      "D": "Simon"
    },
    "answer": "B",
    "explanation": "Zacchaeus climbed a sycamore tree to see Jesus (Luke 19:1–10)."
  },
  {
    "id": "47",
    "year": "2000",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that defeated Goliath’s brothers?",
    "options": {
      "A": "Saul",
      "B": "David",
      "C": "Jonathan",
      "D": "Abner"
    },
    "answer": "B",
    "explanation": "David’s men killed Goliath’s brothers during later battles (2 Samuel 21:19)."
  },
  {
    "id": "48",
    "year": "2023",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which book records the early history of the Christian church?",
    "options": {
      "A": "Romans",
      "B": "Acts",
      "C": "Galatians",
      "D": "Revelation"
    },
    "answer": "B",
    "explanation": "The Acts of the Apostles details the early church’s growth (Acts 1–28)."
  },
  {
    "id": "49",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the tower built to reach heaven?",
    "options": {
      "A": "Babel",
      "B": "Siloam",
      "C": "Ziggurat",
      "D": "Eden"
    },
    "answer": "A",
    "explanation": "The Tower of Babel was built to reach the heavens, leading to God confusing languages (Genesis 11:1–9)."
  },
  {
    "id": "50",
    "year": "2010",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the high priest who questioned Jesus during His trial?",
    "options": {
      "A": "Annas",
      "B": "Caiaphas",
      "C": "Gamaliel",
      "D": "Sadducee"
    },
    "answer": "B",
    "explanation": "Caiaphas was the high priest during Jesus’ trial (Matthew 26:57–68)."
  },
  {
    "id": "51",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the judge known for his strength and long hair?",
    "options": {
      "A": "Gideon",
      "B": "Samson",
      "C": "Ehud",
      "D": "Othniel"
    },
    "answer": "B",
    "explanation": "Samson’s strength was tied to his Nazirite vow, including not cutting his hair (Judges 13–16)."
  },
  {
    "id": "52",
    "year": "2008",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple denied Jesus three times before the rooster crowed?",
    "options": {
      "A": "Peter",
      "B": "John",
      "C": "James",
      "D": "Andrew"
    },
    "answer": "A",
    "explanation": "Peter denied knowing Jesus three times, as Jesus had predicted (Luke 22:54–62)."
  },
  {
    "id": "53",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that interpreted Nebuchadnezzar’s dream?",
    "options": {
      "A": "Daniel",
      "B": "Ezekiel",
      "C": "Jeremiah",
      "D": "Isaiah"
    },
    "answer": "A",
    "explanation": "Daniel interpreted the king’s dream about a statue (Daniel 2)."
  },
  {
    "id": "54",
    "year": "2003",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the name of the place where Jesus prayed before His arrest?",
    "options": {
      "A": "Gethsemane",
      "B": "Golgotha",
      "C": "Bethany",
      "D": "Capernaum"
    },
    "answer": "A",
    "explanation": "Jesus prayed in the Garden of Gethsemane before His arrest (Matthew 26:36–46)."
  },
  {
    "id": "55",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the wife of Ahab who promoted Baal worship?",
    "options": {
      "A": "Jezebel",
      "B": "Athaliah",
      "C": "Vashti",
      "D": "Esther"
    },
    "answer": "A",
    "explanation": "Jezebel promoted Baal worship in Israel (1 Kings 16:31–33)."
  },
  {
    "id": "56",
    "year": "2007",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which woman anointed Jesus’ feet with perfume?",
    "options": {
      "A": "Mary Magdalene",
      "B": "Martha",
      "C": "Mary of Bethany",
      "D": "Joanna"
    },
    "answer": "C",
    "explanation": "Mary of Bethany anointed Jesus’ feet with costly perfume (John 12:1–8)."
  },
  {
    "id": "57",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the city where Esther became queen?",
    "options": {
      "A": "Jerusalem",
      "B": "Babylon",
      "C": "Susa",
      "D": "Nineveh"
    },
    "answer": "C",
    "explanation": "Esther became queen in Susa, the Persian capital (Esther 2:5–17)."
  },
  {
    "id": "58",
    "year": "2020",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which epistle was written by Paul to address issues in the church at Corinth?",
    "options": {
      "A": "Romans",
      "B": "Galatians",
      "C": "1 Corinthians",
      "D": "Ephesians"
    },
    "answer": "C",
    "explanation": "1 Corinthians addresses various issues in the Corinthian church (1 Corinthians 1–16)."
  },
  {
    "id": "59",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the father of Methuselah?",
    "options": {
      "A": "Enoch",
      "B": "Noah",
      "C": "Lamech",
      "D": "Jared"
    },
    "answer": "A",
    "explanation": "Enoch was the father of Methuselah, known for his long life (Genesis 5:21–27)."
  },
  {
    "id": "60",
    "year": "2016",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the angel that announced Jesus’ birth to the shepherds?",
    "options": {
      "A": "Gabriel",
      "B": "Michael",
      "C": "Raphael",
      "D": "Uriel"
    },
    "answer": "A",
    "explanation": "The angel Gabriel announced Jesus’ birth to the shepherds (Luke 2:8–14)."
  },
  {
    "id": "61",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who wrestled with Jacob?",
    "options": {
      "A": "Esau",
      "B": "Laban",
      "C": "Angel of God",
      "D": "Isaac"
    },
    "answer": "C",
    "explanation": "Jacob wrestled with an angel of God, who blessed him (Genesis 32:24–30)."
  },
  {
    "id": "62",
    "year": "2021",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was a zealot?",
    "options": {
      "A": "Simon",
      "B": "Andrew",
      "C": "Philip",
      "D": "Bartholomew"
    },
    "answer": "A",
    "explanation": "Simon the Zealot was one of Jesus’ twelve disciples (Luke 6:15)."
  },
  {
    "id": "63",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that had a dream about seven fat and seven lean cows?",
    "options": {
      "A": "Nebuchadnezzar",
      "B": "Pharaoh",
      "C": "Ahasuerus",
      "D": "Belshazzar"
    },
    "answer": "B",
    "explanation": "Pharaoh’s dream was interpreted by Joseph (Genesis 41:1–36)."
  },
  {
    "id": "64",
    "year": "2006",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the name of the man Jesus raised from the dead in Bethany?",
    "options": {
      "A": "Jairus",
      "B": "Lazarus",
      "C": "Bartimaeus",
      "D": "Eutychus"
    },
    "answer": "B",
    "explanation": "Jesus raised Lazarus from the dead in Bethany (John 11:1–44)."
  },
  {
    "id": "65",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that confronted David about his sin with Bathsheba?",
    "options": {
      "A": "Samuel",
      "B": "Nathan",
      "C": "Gad",
      "D": "Ahijah"
    },
    "answer": "B",
    "explanation": "Nathan rebuked David for his sin with Bathsheba (2 Samuel 12:1–14)."
  },
  {
    "id": "66",
    "year": "2004",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves a son who squandered his inheritance?",
    "options": {
      "A": "The Good Samaritan",
      "B": "The Prodigal Son",
      "C": "The Sower",
      "D": "The Talents"
    },
    "answer": "B",
    "explanation": "The Prodigal Son parable teaches about forgiveness and restoration (Luke 15:11–32)."
  },
  {
    "id": "67",
    "year": "2017",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the priest who raised Samuel?",
    "options": {
      "A": "Eli",
      "B": "Aaron",
      "C": "Zadok",
      "D": "Phinehas"
    },
    "answer": "A",
    "explanation": "Eli raised Samuel in the temple at Shiloh (1 Samuel 1:24–28)."
  },
  {
    "id": "68",
    "year": "2013",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the first person to see Jesus after His resurrection?",
    "options": {
      "A": "Peter",
      "B": "Mary Magdalene",
      "C": "John",
      "D": "Thomas"
    },
    "answer": "B",
    "explanation": "Mary Magdalene was the first to see the risen Jesus (John 20:11–18)."
  },
  {
    "id": "69",
    "year": "2001",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the son of Abraham by Hagar?",
    "options": {
      "A": "Isaac",
      "B": "Ishmael",
      "C": "Jacob",
      "D": "Esau"
    },
    "answer": "B",
    "explanation": "Ishmael was born to Abraham through Hagar, Sarah’s servant (Genesis 16:15)."
  },
  {
    "id": "70",
    "year": "2022",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was Paul headed to when he was converted?",
    "options": {
      "A": "Jerusalem",
      "B": "Damascus",
      "C": "Antioch",
      "D": "Corinth"
    },
    "answer": "B",
    "explanation": "Paul was on the road to Damascus when he encountered Jesus (Acts 9:1–9)."
  },
  {
    "id": "71",
    "year": "2000",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who built an ark to save his family?",
    "options": {
      "A": "Noah",
      "B": "Enoch",
      "C": "Methuselah",
      "D": "Lamech"
    },
    "answer": "A",
    "explanation": "Noah built an ark as God commanded to survive the flood (Genesis 6:13–22)."
  },
  {
    "id": "72",
    "year": "2023",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was a fisherman before following Jesus?",
    "options": {
      "A": "Matthew",
      "B": "Peter",
      "C": "Thomas",
      "D": "Judas"
    },
    "answer": "B",
    "explanation": "Peter was a fisherman when Jesus called him (Matthew 4:18–20)."
  },
  {
    "id": "73",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that fled from Jezebel to Mount Horeb?",
    "options": {
      "A": "Elijah",
      "B": "Elisha",
      "C": "Obadiah",
      "D": "Micah"
    },
    "answer": "A",
    "explanation": "Elijah fled to Mount Horeb after confronting Jezebel’s prophets (1 Kings 19:1–8)."
  },
  {
    "id": "74",
    "year": "2010",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the name of the blind man healed by Jesus in Jericho?",
    "options": {
      "A": "Lazarus",
      "B": "Bartimaeus",
      "C": "Zacchaeus",
      "D": "Eutychus"
    },
    "answer": "B",
    "explanation": "Bartimaeus received his sight from Jesus in Jericho (Mark 10:46–52)."
  },
  {
    "id": "75",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the woman who hid the Israelite spies in Jericho?",
    "options": {
      "A": "Rahab",
      "B": "Deborah",
      "C": "Jael",
      "D": "Ruth"
    },
    "answer": "A",
    "explanation": "Rahab hid the spies and was spared during Jericho’s fall (Joshua 2:1–21)."
  },
  {
    "id": "76",
    "year": "2008",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which mountain is associated with Jesus’ transfiguration?",
    "options": {
      "A": "Sinai",
      "B": "Tabor",
      "C": "Zion",
      "D": "Olives"
    },
    "answer": "B",
    "explanation": "Jesus was transfigured on Mount Tabor (Matthew 17:1–9)."
  },
  {
    "id": "77",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that repented after Jonah’s preaching?",
    "options": {
      "A": "Ahab",
      "B": "King of Nineveh",
      "C": "Hezekiah",
      "D": "Josiah"
    },
    "answer": "B",
    "explanation": "The King of Nineveh led the city in repentance after Jonah’s message (Jonah 3:6–10)."
  },
  {
    "id": "78",
    "year": "2003",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was called to walk on water with Jesus?",
    "options": {
      "A": "John",
      "B": "Peter",
      "C": "James",
      "D": "Andrew"
    },
    "answer": "B",
    "explanation": "Peter walked on water toward Jesus but began to sink due to doubt (Matthew 14:28–31)."
  },
  {
    "id": "79",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who offered his daughters to save Lot’s guests?",
    "options": {
      "A": "Abraham",
      "B": "Lot",
      "C": "Laban",
      "D": "Isaac"
    },
    "answer": "B",
    "explanation": "Lot offered his daughters to protect his angelic guests in Sodom (Genesis 19:1–8)."
  },
  {
    "id": "80",
    "year": "2007",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which Gospel is written by a physician?",
    "options": {
      "A": "Matthew",
      "B": "Mark",
      "C": "Luke",
      "D": "John"
    },
    "answer": "C",
    "explanation": "Luke, a physician, wrote the Gospel of Luke (Colossians 4:14)."
  },
  {
    "id": "81",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that saw a vision of dry bones coming to life?",
    "options": {
      "A": "Isaiah",
      "B": "Jeremiah",
      "C": "Ezekiel",
      "D": "Daniel"
    },
    "answer": "C",
    "explanation": "Ezekiel saw the vision of the valley of dry bones (Ezekiel 37:1–14)."
  },
  {
    "id": "82",
    "year": "2020",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which woman was healed by touching Jesus’ garment?",
    "options": {
      "A": "Mary Magdalene",
      "B": "Woman with the issue of blood",
      "C": "Martha",
      "D": "Lydia"
    },
    "answer": "B",
    "explanation": "The woman with the issue of blood was healed by touching Jesus’ garment (Mark 5:25–34)."
  },
  {
    "id": "83",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the son of David who tried to seize the throne?",
    "options": {
      "A": "Solomon",
      "B": "Absalom",
      "C": "Adonijah",
      "D": "Amnon"
    },
    "answer": "B",
    "explanation": "Absalom rebelled against David to take the throne (2 Samuel 15:1–12)."
  },
  {
    "id": "84",
    "year": "2016",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves a mustard seed?",
    "options": {
      "A": "The Sower",
      "B": "The Prodigal Son",
      "C": "The Mustard Seed",
      "D": "The Talents"
    },
    "answer": "C",
    "explanation": "The Mustard Seed parable teaches about the growth of God’s kingdom (Matthew 13:31–32)."
  },
  {
    "id": "85",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that saw the handwriting on the wall?",
    "options": {
      "A": "Nebuchadnezzar",
      "B": "Belshazzar",
      "C": "Darius",
      "D": "Cyrus"
    },
    "answer": "B",
    "explanation": "Belshazzar saw the handwriting on the wall, interpreted by Daniel (Daniel 5:5–31)."
  },
  {
    "id": "86",
    "year": "2021",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the companion of Paul on his first missionary journey?",
    "options": {
      "A": "Silas",
      "B": "Timothy",
      "C": "Barnabas",
      "D": "Luke"
    },
    "answer": "C",
    "explanation": "Barnabas accompanied Paul on his first missionary journey (Acts 13:1–3)."
  },
  {
    "id": "87",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the woman who became Boaz’s wife?",
    "options": {
      "A": "Ruth",
      "B": "Naomi",
      "C": "Orpah",
      "D": "Tamar"
    },
    "answer": "A",
    "explanation": "Ruth married Boaz and became an ancestor of David (Ruth 4:13–22)."
  },
  {
    "id": "88",
    "year": "2006",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was known as the ‘city of David’ in the New Testament?",
    "options": {
      "A": "Jerusalem",
      "B": "Bethlehem",
      "C": "Nazareth",
      "D": "Hebron"
    },
    "answer": "B",
    "explanation": "Bethlehem is called the city of David, where Jesus was born (Luke 2:4)."
  },
  {
    "id": "89",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that predicted the fall of Samaria?",
    "options": {
      "A": "Hosea",
      "B": "Amos",
      "C": "Micah",
      "D": "Joel"
    },
    "answer": "B",
    "explanation": "Amos prophesied against the northern kingdom, including Samaria’s fall (Amos 3:9–15)."
  },
  {
    "id": "90",
    "year": "2004",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was the brother of John?",
    "options": {
      "A": "Peter",
      "B": "James",
      "C": "Andrew",
      "D": "Philip"
    },
    "answer": "B",
    "explanation": "James, the son of Zebedee, was John’s brother (Mark 1:19)."
  },
  {
    "id": "91",
    "year": "2017",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who sold his birthright to Jacob?",
    "options": {
      "A": "Esau",
      "B": "Reuben",
      "C": "Joseph",
      "D": "Benjamin"
    },
    "answer": "A",
    "explanation": "Esau sold his birthright to Jacob for a bowl of stew (Genesis 25:29–34)."
  },
  {
    "id": "92",
    "year": "2013",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which miracle involved Jesus feeding 5,000 people?",
    "options": {
      "A": "Walking on water",
      "B": "Feeding the 5,000",
      "C": "Healing the blind",
      "D": "Raising Lazarus"
    },
    "answer": "B",
    "explanation": "Jesus fed 5,000 with five loaves and two fish (Matthew 14:13–21)."
  },
  {
    "id": "93",
    "year": "2001",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that was fed by ravens?",
    "options": {
      "A": "Elijah",
      "B": "Elisha",
      "C": "Isaiah",
      "D": "Jeremiah"
    },
    "answer": "A",
    "explanation": "God sent ravens to feed Elijah during a drought (1 Kings 17:2–6)."
  },
  {
    "id": "94",
    "year": "2022",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which woman was a seller of purple goods and hosted Paul?",
    "options": {
      "A": "Lydia",
      "B": "Priscilla",
      "C": "Dorcas",
      "D": "Phoebe"
    },
    "answer": "A",
    "explanation": "Lydia, a seller of purple, hosted Paul in Philippi (Acts 16:14–15)."
  },
  {
    "id": "95",
    "year": "2000",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the city where David was anointed king?",
    "options": {
      "A": "Jerusalem",
      "B": "Hebron",
      "C": "Bethlehem",
      "D": "Shiloh"
    },
    "answer": "C",
    "explanation": "David was anointed king in Bethlehem by Samuel (1 Samuel 16:1–13)."
  },
  {
    "id": "96",
    "year": "2023",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which epistle emphasizes faith without works is dead?",
    "options": {
      "A": "Romans",
      "B": "James",
      "C": "Hebrews",
      "D": "1 Peter"
    },
    "answer": "B",
    "explanation": "The Book of James teaches that faith without works is dead (James 2:14–26)."
  },
  {
    "id": "97",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that called down fire from heaven on Mount Carmel?",
    "options": {
      "A": "Elijah",
      "B": "Elisha",
      "C": "Nathan",
      "D": "Gad"
    },
    "answer": "A",
    "explanation": "Elijah called down fire to prove God’s power over Baal (1 Kings 18:20–40)."
  },
  {
    "id": "98",
    "year": "2010",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was crucified upside down according to tradition?",
    "options": {
      "A": "Peter",
      "B": "Paul",
      "C": "James",
      "D": "John"
    },
    "answer": "A",
    "explanation": "Peter was crucified upside down, as he felt unworthy to die like Jesus."
  },
  {
    "id": "99",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who led a rebellion against Moses?",
    "options": {
      "A": "Korah",
      "B": "Balaam",
      "C": "Dathan",
      "D": "Abiram"
    },
    "answer": "A",
    "explanation": "Korah led a rebellion against Moses’ authority (Numbers 16:1–35)."
  },
  {
    "id": "100",
    "year": "2008",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves a man who found a treasure in a field?",
    "options": {
      "A": "The Pearl of Great Price",
      "B": "The Hidden Treasure",
      "C": "The Lost Sheep",
      "D": "The Sower"
    },
    "answer": "B",
    "explanation": "The Hidden Treasure parable teaches about the value of God’s kingdom (Matthew 13:44)."
  },
  {
    "id": "101",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that predicted the exile to Babylon?",
    "options": {
      "A": "Isaiah",
      "B": "Jeremiah",
      "C": "Ezekiel",
      "D": "Hosea"
    },
    "answer": "B",
    "explanation": "Jeremiah warned Judah of the Babylonian exile (Jeremiah 25:8–11)."
  },
  {
    "id": "102",
    "year": "2003",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was the first to recognize Jesus as the Messiah?",
    "options": {
      "A": "Peter",
      "B": "John",
      "C": "Andrew",
      "D": "Philip"
    },
    "answer": "A",
    "explanation": "Peter declared Jesus as the Messiah (Matthew 16:16)."
  },
  {
    "id": "103",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who was swallowed by a great fish?",
    "options": {
      "A": "Jonah",
      "B": "Elijah",
      "C": "Elisha",
      "D": "Isaiah"
    },
    "answer": "A",
    "explanation": "Jonah was swallowed by a great fish for disobeying God (Jonah 1:17)."
  },
  {
    "id": "104",
    "year": "2007",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was the destination of Paul’s final journey in Acts?",
    "options": {
      "A": "Jerusalem",
      "B": "Rome",
      "C": "Antioch",
      "D": "Ephesus"
    },
    "answer": "B",
    "explanation": "Paul was taken to Rome as a prisoner (Acts 28:16)."
  },
  {
    "id": "105",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that married Esther?",
    "options": {
      "A": "Darius",
      "B": "Cyrus",
      "C": "Ahasuerus",
      "D": "Artaxerxes"
    },
    "answer": "C",
    "explanation": "Esther became the queen of King Ahasuerus (Esther 2:17)."
  },
  {
    "id": "106",
    "year": "2020",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was known as the ‘beloved disciple’?",
    "options": {
      "A": "Peter",
      "B": "John",
      "C": "James",
      "D": "Andrew"
    },
    "answer": "B",
    "explanation": "John is traditionally identified as the ‘disciple whom Jesus loved’ (John 19:26)."
  },
  {
    "id": "107",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who killed Sisera with a tent peg?",
    "options": {
      "A": "Deborah",
      "B": "Jael",
      "C": "Barak",
      "D": "Gideon"
    },
    "answer": "B",
    "explanation": "Jael killed Sisera by driving a tent peg through his head (Judges 4:21)."
  },
  {
    "id": "108",
    "year": "2016",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves ten virgins waiting for a bridegroom?",
    "options": {
      "A": "The Ten Virgins",
      "B": "The Prodigal Son",
      "C": "The Good Samaritan",
      "D": "The Sower"
    },
    "answer": "A",
    "explanation": "The Ten Virgins parable teaches about readiness for Christ’s return (Matthew 25:1–13)."
  },
  {
    "id": "109",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that succeeded Elijah?",
    "options": {
      "A": "Elisha",
      "B": "Isaiah",
      "C": "Jeremiah",
      "D": "Hosea"
    },
    "answer": "A",
    "explanation": "Elisha received Elijah’s mantle and continued his prophetic ministry (2 Kings 2:9–15)."
  },
  {
    "id": "110",
    "year": "2021",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which woman was raised from the dead by Peter?",
    "options": {
      "A": "Lydia",
      "B": "Dorcas",
      "C": "Priscilla",
      "D": "Phoebe"
    },
    "answer": "B",
    "explanation": "Peter raised Dorcas, also called Tabitha, from the dead (Acts 9:36–41)."
  },
  {
    "id": "111",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who was the first murderer?",
    "options": {
      "A": "Cain",
      "B": "Abel",
      "C": "Seth",
      "D": "Enoch"
    },
    "answer": "A",
    "explanation": "Cain killed his brother Abel out of jealousy (Genesis 4:8)."
  },
  {
    "id": "112",
    "year": "2006",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple replaced Judas Iscariot?",
    "options": {
      "A": "Matthias",
      "B": "Barnabas",
      "C": "Silas",
      "D": "Timothy"
    },
    "answer": "A",
    "explanation": "Matthias was chosen by lot to replace Judas (Acts 1:26)."
  },
  {
    "id": "113",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that rebuilt Jericho at the cost of his sons?",
    "options": {
      "A": "Ahab",
      "B": "Hiel",
      "C": "Jeroboam",
      "D": "Omri"
    },
    "answer": "B",
    "explanation": "Hiel rebuilt Jericho, losing his sons as a curse (1 Kings 16:34)."
  },
  {
    "id": "114",
    "year": "2004",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which epistle was written to encourage perseverance in trials?",
    "options": {
      "A": "Romans",
      "B": "Hebrews",
      "C": "1 Peter",
      "D": "James"
    },
    "answer": "D",
    "explanation": "James encourages believers to persevere through trials (James 1:2–4)."
  },
  {
    "id": "115",
    "year": "2017",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who interpreted the writing on the wall?",
    "options": {
      "A": "Daniel",
      "B": "Joseph",
      "C": "Ezra",
      "D": "Nehemiah"
    },
    "answer": "A",
    "explanation": "Daniel interpreted the writing on the wall for Belshazzar (Daniel 5:25–28)."
  },
  {
    "id": "116",
    "year": "2013",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was the site of Pentecost in Acts?",
    "options": {
      "A": "Jerusalem",
      "B": "Antioch",
      "C": "Ephesus",
      "D": "Corinth"
    },
    "answer": "A",
    "explanation": "The Holy Spirit descended on the disciples in Jerusalem at Pentecost (Acts 2:1–4)."
  },
  {
    "id": "117",
    "year": "2001",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that rebuilt the walls of Jerusalem?",
    "options": {
      "A": "Ezra",
      "B": "Nehemiah",
      "C": "Haggai",
      "D": "Zechariah"
    },
    "answer": "B",
    "explanation": "Nehemiah led the rebuilding of Jerusalem’s walls (Nehemiah 2:11–20)."
  },
  {
    "id": "118",
    "year": "2022",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was a tentmaker by trade?",
    "options": {
      "A": "Peter",
      "B": "Paul",
      "C": "John",
      "D": "James"
    },
    "answer": "B",
    "explanation": "Paul worked as a tentmaker to support his ministry (Acts 18:3)."
  },
  {
    "id": "119",
    "year": "2000",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who led the Exodus from Egypt?",
    "options": {
      "A": "Aaron",
      "B": "Moses",
      "C": "Joshua",
      "D": "Caleb"
    },
    "answer": "B",
    "explanation": "Moses led the Israelites out of Egypt (Exodus 12:31–42)."
  },
  {
    "id": "120",
    "year": "2023",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves a vineyard owner and tenants?",
    "options": {
      "A": "The Sower",
      "B": "The Tenants",
      "C": "The Prodigal Son",
      "D": "The Lost Sheep"
    },
    "answer": "B",
    "explanation": "The Parable of the Tenants teaches about rejecting God’s messengers (Matthew 21:33–46)."
  },
  {
    "id": "121",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that was thrown into a cistern?",
    "options": {
      "A": "Isaiah",
      "B": "Jeremiah",
      "C": "Ezekiel",
      "D": "Hosea"
    },
    "answer": "B",
    "explanation": "Jeremiah was thrown into a cistern for his prophecies (Jeremiah 38:6)."
  },
  {
    "id": "122",
    "year": "2010",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was the treasurer for Jesus and His disciples?",
    "options": {
      "A": "Peter",
      "B": "Judas Iscariot",
      "C": "Matthew",
      "D": "Thomas"
    },
    "answer": "B",
    "explanation": "Judas Iscariot managed the money for Jesus’ group (John 12:6)."
  },
  {
    "id": "123",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who was a leper healed by Elisha?",
    "options": {
      "A": "Naaman",
      "B": "Gehazi",
      "C": "Uzziah",
      "D": "Joab"
    },
    "answer": "A",
    "explanation": "Naaman was healed of leprosy by Elisha (2 Kings 5:1–14)."
  },
  {
    "id": "124",
    "year": "2008",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was the home of Cornelius, the first Gentile convert?",
    "options": {
      "A": "Joppa",
      "B": "Caesarea",
      "C": "Antioch",
      "D": "Damascus"
    },
    "answer": "B",
    "explanation": "Cornelius, a centurion in Caesarea, was baptized by Peter (Acts 10:1–48)."
  },
  {
    "id": "125",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that was struck with leprosy for burning incense?",
    "options": {
      "A": "Uzziah",
      "B": "Hezekiah",
      "C": "Josiah",
      "D": "Manasseh"
    },
    "answer": "A",
    "explanation": "Uzziah was struck with leprosy for unlawfully burning incense (2 Chronicles 26:16–21)."
  },
  {
    "id": "126",
    "year": "2003",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was a tax collector before following Jesus?",
    "options": {
      "A": "Peter",
      "B": "Matthew",
      "C": "John",
      "D": "James"
    },
    "answer": "B",
    "explanation": "Matthew was a tax collector when Jesus called him (Matthew 9:9)."
  },
  {
    "id": "127",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who was a cupbearer to the king of Persia?",
    "options": {
      "A": "Ezra",
      "B": "Nehemiah",
      "C": "Mordecai",
      "D": "Haggai"
    },
    "answer": "B",
    "explanation": "Nehemiah was the cupbearer to King Artaxerxes (Nehemiah 1:11)."
  },
  {
    "id": "128",
    "year": "2007",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves a man who built his house on rock?",
    "options": {
      "A": "The Wise and Foolish Builders",
      "B": "The Sower",
      "C": "The Prodigal Son",
      "D": "The Good Samaritan"
    },
    "answer": "A",
    "explanation": "The Wise and Foolish Builders parable teaches about a strong foundation (Matthew 7:24–27)."
  },
  {
    "id": "129",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that predicted a new covenant with Israel?",
    "options": {
      "A": "Isaiah",
      "B": "Jeremiah",
      "C": "Ezekiel",
      "D": "Hosea"
    },
    "answer": "B",
    "explanation": "Jeremiah prophesied about a new covenant (Jeremiah 31:31–34)."
  },
  {
    "id": "130",
    "year": "2020",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was a brother of Andrew?",
    "options": {
      "A": "Peter",
      "B": "James",
      "C": "John",
      "D": "Philip"
    },
    "answer": "A",
    "explanation": "Peter, also called Simon, was Andrew’s brother (Matthew 4:18)."
  },
  {
    "id": "131",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who was a scribe and priest in the time of Nehemiah?",
    "options": {
      "A": "Ezra",
      "B": "Nehemiah",
      "C": "Mordecai",
      "D": "Haggai"
    },
    "answer": "A",
    "explanation": "Ezra was a scribe and priest who taught the law (Ezra 7:1–10)."
  },
  {
    "id": "132",
    "year": "2016",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which woman was known for her good deeds and charity in Joppa?",
    "options": {
      "A": "Lydia",
      "B": "Dorcas",
      "C": "Priscilla",
      "D": "Phoebe"
    },
    "answer": "B",
    "explanation": "Dorcas was known for her good deeds and charity (Acts 9:36–43)."
  },
  {
    "id": "1",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the first king of Israel according to the Old Testament?",
    "options": {
      "A": "Saul",
      "B": "David",
      "C": "Solomon",
      "D": "Samuel"
    },
    "answer": "A",
    "explanation": "Saul was anointed as the first king by Samuel, as recorded in 1 Samuel 10."
  },
  {
    "id": "2",
    "year": "2010",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the mountain where Moses received the Ten Commandments?",
    "options": {
      "A": "Sinai",
      "B": "Horeb",
      "C": "Zion",
      "D": "Carmel"
    },
    "answer": "A",
    "explanation": "Mount Sinai is where God gave Moses the Ten Commandments (Exodus 19–20)."
  },
  {
    "id": "3",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who led the Israelites into the Promised Land after Moses' death?",
    "options": {
      "A": "Aaron",
      "B": "Joshua",
      "C": "Caleb",
      "D": "Gideon"
    },
    "answer": "B",
    "explanation": "Joshua succeeded Moses and led the Israelites into Canaan (Joshua 1)."
  },
  {
    "id": "4",
    "year": "2008",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the sign of God’s covenant with Noah?",
    "options": {
      "A": "Rainbow",
      "B": "Ark",
      "C": "Dove",
      "D": "Altar"
    },
    "answer": "A",
    "explanation": "The rainbow was a sign of God’s promise never to destroy the earth with a flood again (Genesis 9:13)."
  },
  {
    "id": "5",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was sold into slavery by his brothers?",
    "options": {
      "A": "Isaac",
      "B": "Jacob",
      "C": "Joseph",
      "D": "Esau"
    },
    "answer": "C",
    "explanation": "Joseph was sold into slavery by his brothers due to jealousy (Genesis 37)."
  },
  {
    "id": "6",
    "year": "2003",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What did God create on the first day according to Genesis?",
    "options": {
      "A": "Light",
      "B": "Sky",
      "C": "Land",
      "D": "Animals"
    },
    "answer": "A",
    "explanation": "On the first day, God created light and separated it from darkness (Genesis 1:3–5)."
  },
  {
    "id": "7",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the mother of Isaac?",
    "options": {
      "A": "Rebekah",
      "B": "Sarah",
      "C": "Rachel",
      "D": "Leah"
    },
    "answer": "B",
    "explanation": "Sarah, Abraham’s wife, gave birth to Isaac in her old age (Genesis 21:1–3)."
  },
  {
    "id": "8",
    "year": "2007",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the prophet who confronted Ahab and Jezebel?",
    "options": {
      "A": "Elijah",
      "B": "Elisha",
      "C": "Isaiah",
      "D": "Jeremiah"
    },
    "answer": "A",
    "explanation": "Elijah challenged King Ahab and Queen Jezebel over idolatry (1 Kings 18)."
  },
  {
    "id": "9",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the punishment for Adam and Eve’s disobedience in Eden?",
    "options": {
      "A": "Flood",
      "B": "Exile",
      "C": "Death",
      "D": "Curse"
    },
    "answer": "D",
    "explanation": "God pronounced curses on Adam, Eve, and the serpent after their disobedience (Genesis 3:16–19)."
  },
  {
    "id": "10",
    "year": "2020",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the father of the twelve tribes of Israel?",
    "options": {
      "A": "Abraham",
      "B": "Isaac",
      "C": "Jacob",
      "D": "Joseph"
    },
    "answer": "C",
    "explanation": "Jacob, also called Israel, had twelve sons who became the patriarchs of the tribes (Genesis 35:22–26)."
  },
  {
    "id": "11",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What did God instruct Abraham to sacrifice before providing a ram?",
    "options": {
      "A": "Isaac",
      "B": "Ishmael",
      "C": "Jacob",
      "D": "Esau"
    },
    "answer": "A",
    "explanation": "God tested Abraham by asking him to sacrifice Isaac (Genesis 22)."
  },
  {
    "id": "12",
    "year": "2016",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the wife of King David who was previously married to Nabal?",
    "options": {
      "A": "Abigail",
      "B": "Bathsheba",
      "C": "Michal",
      "D": "Tamar"
    },
    "answer": "A",
    "explanation": "Abigail became David’s wife after Nabal’s death (1 Samuel 25)."
  },
  {
    "id": "13",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the giant killed by David?",
    "options": {
      "A": "Goliath",
      "B": "Samson",
      "C": "Absalom",
      "D": "Saul"
    },
    "answer": "A",
    "explanation": "David defeated Goliath with a sling and stone (1 Samuel 17)."
  },
  {
    "id": "14",
    "year": "2021",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Which prophet was taken to heaven in a chariot of fire?",
    "options": {
      "A": "Elisha",
      "B": "Elijah",
      "C": "Isaiah",
      "D": "Ezekiel"
    },
    "answer": "B",
    "explanation": "Elijah was taken to heaven in a whirlwind with a chariot of fire (2 Kings 2:11)."
  },
  {
    "id": "15",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the city where Jonah was sent to preach?",
    "options": {
      "A": "Nineveh",
      "B": "Jericho",
      "C": "Jerusalem",
      "D": "Bethlehem"
    },
    "answer": "A",
    "explanation": "Jonah was sent to preach repentance to Nineveh (Jonah 1:2)."
  },
  {
    "id": "16",
    "year": "2006",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the father-in-law of Moses?",
    "options": {
      "A": "Aaron",
      "B": "Jethro",
      "C": "Amram",
      "D": "Eleazar"
    },
    "answer": "B",
    "explanation": "Jethro, a Midianite priest, was Moses’ father-in-law (Exodus 3:1)."
  },
  {
    "id": "17",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the sea parted for the Israelites’ escape from Egypt?",
    "options": {
      "A": "Red Sea",
      "B": "Dead Sea",
      "C": "Sea of Galilee",
      "D": "Jordan River"
    },
    "answer": "A",
    "explanation": "God parted the Red Sea to allow the Israelites to escape Pharaoh’s army (Exodus 14)."
  },
  {
    "id": "18",
    "year": "2004",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the first high priest of Israel?",
    "options": {
      "A": "Moses",
      "B": "Aaron",
      "C": "Samuel",
      "D": "Eli"
    },
    "answer": "B",
    "explanation": "Aaron, Moses’ brother, was appointed as the first high priest (Exodus 28)."
  },

  {
    "id": "1",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the first king of Israel according to the Old Testament?",
    "options": {
      "A": "Saul",
      "B": "David",
      "C": "Solomon",
      "D": "Samuel"
    },
    "answer": "A",
    "explanation": "Saul was anointed as the first king by Samuel, as recorded in 1 Samuel 10."
  },
  {
    "id": "2",
    "year": "2010",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the mountain where Moses received the Ten Commandments?",
    "options": {
      "A": "Sinai",
      "B": "Horeb",
      "C": "Zion",
      "D": "Carmel"
    },
    "answer": "A",
    "explanation": "Mount Sinai is where God gave Moses the Ten Commandments (Exodus 19–20)."
  },
  {
    "id": "3",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who led the Israelites into the Promised Land after Moses' death?",
    "options": {
      "A": "Aaron",
      "B": "Joshua",
      "C": "Caleb",
      "D": "Gideon"
    },
    "answer": "B",
    "explanation": "Joshua succeeded Moses and led the Israelites into Canaan (Joshua 1)."
  },
  {
    "id": "4",
    "year": "2008",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the sign of God’s covenant with Noah?",
    "options": {
      "A": "Rainbow",
      "B": "Ark",
      "C": "Dove",
      "D": "Altar"
    },
    "answer": "A",
    "explanation": "The rainbow was a sign of God’s promise never to destroy the earth with a flood again (Genesis 9:13)."
  },
  {
    "id": "5",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was sold into slavery by his brothers?",
    "options": {
      "A": "Isaac",
      "B": "Jacob",
      "C": "Joseph",
      "D": "Esau"
    },
    "answer": "C",
    "explanation": "Joseph was sold into slavery by his brothers due to jealousy (Genesis 37)."
  },
  {
    "id": "6",
    "year": "2003",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What did God create on the first day according to Genesis?",
    "options": {
      "A": "Light",
      "B": "Sky",
      "C": "Land",
      "D": "Animals"
    },
    "answer": "A",
    "explanation": "On the first day, God created light and separated it from darkness (Genesis 1:3–5)."
  },
  {
    "id": "7",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the mother of Isaac?",
    "options": {
      "A": "Rebekah",
      "B": "Sarah",
      "C": "Rachel",
      "D": "Leah"
    },
    "answer": "B",
    "explanation": "Sarah, Abraham’s wife, gave birth to Isaac in her old age (Genesis 21:1–3)."
  },
  {
    "id": "8",
    "year": "2007",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the prophet who confronted Ahab and Jezebel?",
    "options": {
      "A": "Elijah",
      "B": "Elisha",
      "C": "Isaiah",
      "D": "Jeremiah"
    },
    "answer": "A",
    "explanation": "Elijah challenged King Ahab and Queen Jezebel over idolatry (1 Kings 18)."
  },
  {
    "id": "9",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the punishment for Adam and Eve’s disobedience in Eden?",
    "options": {
      "A": "Flood",
      "B": "Exile",
      "C": "Death",
      "D": "Curse"
    },
    "answer": "D",
    "explanation": "God pronounced curses on Adam, Eve, and the serpent after their disobedience (Genesis 3:16–19)."
  },
  {
    "id": "10",
    "year": "2020",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the father of the twelve tribes of Israel?",
    "options": {
      "A": "Abraham",
      "B": "Isaac",
      "C": "Jacob",
      "D": "Joseph"
    },
    "answer": "C",
    "explanation": "Jacob, also called Israel, had twelve sons who became the patriarchs of the tribes (Genesis 35:22–26)."
  },
  {
    "id": "11",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What did God instruct Abraham to sacrifice before providing a ram?",
    "options": {
      "A": "Isaac",
      "B": "Ishmael",
      "C": "Jacob",
      "D": "Esau"
    },
    "answer": "A",
    "explanation": "God tested Abraham by asking him to sacrifice Isaac (Genesis 22)."
  },
  {
    "id": "12",
    "year": "2016",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the wife of King David who was previously married to Nabal?",
    "options": {
      "A": "Abigail",
      "B": "Bathsheba",
      "C": "Michal",
      "D": "Tamar"
    },
    "answer": "A",
    "explanation": "Abigail became David’s wife after Nabal’s death (1 Samuel 25)."
  },
  {
    "id": "13",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the giant killed by David?",
    "options": {
      "A": "Goliath",
      "B": "Samson",
      "C": "Absalom",
      "D": "Saul"
    },
    "answer": "A",
    "explanation": "David defeated Goliath with a sling and stone (1 Samuel 17)."
  },
  {
    "id": "14",
    "year": "2021",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Which prophet was taken to heaven in a chariot of fire?",
    "options": {
      "A": "Elisha",
      "B": "Elijah",
      "C": "Isaiah",
      "D": "Ezekiel"
    },
    "answer": "B",
    "explanation": "Elijah was taken to heaven in a whirlwind with a chariot of fire (2 Kings 2:11)."
  },
  {
    "id": "15",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the city where Jonah was sent to preach?",
    "options": {
      "A": "Nineveh",
      "B": "Jericho",
      "C": "Jerusalem",
      "D": "Bethlehem"
    },
    "answer": "A",
    "explanation": "Jonah was sent to preach repentance to Nineveh (Jonah 1:2)."
  },
  {
    "id": "16",
    "year": "2006",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the father-in-law of Moses?",
    "options": {
      "A": "Aaron",
      "B": "Jethro",
      "C": "Amram",
      "D": "Eleazar"
    },
    "answer": "B",
    "explanation": "Jethro, a Midianite priest, was Moses’ father-in-law (Exodus 3:1)."
  },
  {
    "id": "17",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the sea parted for the Israelites’ escape from Egypt?",
    "options": {
      "A": "Red Sea",
      "B": "Dead Sea",
      "C": "Sea of Galilee",
      "D": "Jordan River"
    },
    "answer": "A",
    "explanation": "God parted the Red Sea to allow the Israelites to escape Pharaoh’s army (Exodus 14)."
  },
  {
    "id": "18",
    "year": "2004",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the first high priest of Israel?",
    "options": {
      "A": "Moses",
      "B": "Aaron",
      "C": "Samuel",
      "D": "Eli"
    },
    "answer": "B",
    "explanation": "Aaron, Moses’ brother, was appointed as the first high priest (Exodus 28)."
  },
  {
    "id": "19",
    "year": "2017",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the judge who defeated the Midianites with 300 men?",
    "options": {
      "A": "Gideon",
      "B": "Samson",
      "C": "Deborah",
      "D": "Barak"
    },
    "answer": "A",
    "explanation": "Gideon defeated the Midianites using a small army, as directed by God (Judges 7)."
  },
  {
    "id": "20",
    "year": "2013",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the mother of Jesus?",
    "options": {
      "A": "Mary",
      "B": "Martha",
      "C": "Elizabeth",
      "D": "Anna"
    },
    "answer": "A",
    "explanation": "Mary was chosen to be the mother of Jesus through the Holy Spirit (Luke 1:26–38)."
  },
  {
    "id": "21",
    "year": "2001",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the occupation of Matthew before he became a disciple?",
    "options": {
      "A": "Fisherman",
      "B": "Tax collector",
      "C": "Carpenter",
      "D": "Shepherd"
    },
    "answer": "B",
    "explanation": "Matthew was a tax collector when Jesus called him to follow (Matthew 9:9)."
  },
  {
    "id": "22",
    "year": "2022",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Where was Jesus born?",
    "options": {
      "A": "Nazareth",
      "B": "Jerusalem",
      "C": "Bethlehem",
      "D": "Capernaum"
    },
    "answer": "C",
    "explanation": "Jesus was born in Bethlehem, as prophesied in Micah 5:2 (Matthew 2:1)."
  },
  {
    "id": "23",
    "year": "2000",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the wife of Isaac?",
    "options": {
      "A": "Rebekah",
      "B": "Rachel",
      "C": "Leah",
      "D": "Sarah"
    },
    "answer": "A",
    "explanation": "Rebekah was chosen as Isaac’s wife (Genesis 24)."
  },
  {
    "id": "24",
    "year": "2023",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who baptized Jesus in the Jordan River?",
    "options": {
      "A": "Peter",
      "B": "John the Baptist",
      "C": "Paul",
      "D": "James"
    },
    "answer": "B",
    "explanation": "John the Baptist baptized Jesus, proclaiming Him as the Messiah (Matthew 3:13–17)."
  },
  {
    "id": "25",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of Jacob’s brother?",
    "options": {
      "A": "Joseph",
      "B": "Esau",
      "C": "Benjamin",
      "D": "Reuben"
    },
    "answer": "B",
    "explanation": "Esau was Jacob’s twin brother (Genesis 25:24–26)."
  },
  {
    "id": "26",
    "year": "2010",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple betrayed Jesus for thirty pieces of silver?",
    "options": {
      "A": "Peter",
      "B": "Judas Iscariot",
      "C": "Thomas",
      "D": "John"
    },
    "answer": "B",
    "explanation": "Judas Iscariot betrayed Jesus to the authorities (Matthew 26:14–16)."
  },
  {
    "id": "27",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that anointed David as king?",
    "options": {
      "A": "Samuel",
      "B": "Nathan",
      "C": "Elijah",
      "D": "Gad"
    },
    "answer": "A",
    "explanation": "Samuel anointed David as king of Israel (1 Samuel 16:13)."
  },
  {
    "id": "28",
    "year": "2008",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the first miracle performed by Jesus?",
    "options": {
      "A": "Healing a blind man",
      "B": "Turning water into wine",
      "C": "Walking on water",
      "D": "Feeding the 5,000"
    },
    "answer": "B",
    "explanation": "Jesus turned water into wine at the wedding in Cana (John 2:1–11)."
  },
  {
    "id": "29",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the river where Moses was found in a basket?",
    "options": {
      "A": "Jordan",
      "B": "Nile",
      "C": "Euphrates",
      "D": "Tigris"
    },
    "answer": "B",
    "explanation": "Moses was placed in a basket in the Nile River (Exodus 2:3)."
  },
  {
    "id": "30",
    "year": "2003",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the Roman governor who sentenced Jesus to death?",
    "options": {
      "A": "Herod",
      "B": "Pilate",
      "C": "Caesar",
      "D": "Felix"
    },
    "answer": "B",
    "explanation": "Pontius Pilate was the governor who sentenced Jesus to crucifixion (Matthew 27:24–26)."
  },
  {
    "id": "31",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that built the first temple in Jerusalem?",
    "options": {
      "A": "Saul",
      "B": "David",
      "C": "Solomon",
      "D": "Hezekiah"
    },
    "answer": "C",
    "explanation": "Solomon built the first temple in Jerusalem (1 Kings 6)."
  },
  {
    "id": "32",
    "year": "2007",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which apostle was known as the 'doubting' disciple?",
    "options": {
      "A": "Peter",
      "B": "Thomas",
      "C": "James",
      "D": "Andrew"
    },
    "answer": "B",
    "explanation": "Thomas doubted Jesus’ resurrection until he saw Him (John 20:24–29)."
  },
  {
    "id": "33",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the Philistine god whose temple Samson destroyed?",
    "options": {
      "A": "Baal",
      "B": "Dagon",
      "C": "Molech",
      "D": "Asherah"
    },
    "answer": "B",
    "explanation": "Samson destroyed the temple of Dagon, killing many Philistines (Judges 16:23–30)."
  },
  {
    "id": "34",
    "year": "2020",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the name of the man who helped carry Jesus’ cross?",
    "options": {
      "A": "Simon of Cyrene",
      "B": "Joseph of Arimathea",
      "C": "Nicodemus",
      "D": "Lazarus"
    },
    "answer": "A",
    "explanation": "Simon of Cyrene was compelled to carry Jesus’ cross (Mark 15:21)."
  },
  {
    "id": "35",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that predicted a virgin would bear a son called Immanuel?",
    "options": {
      "A": "Jeremiah",
      "B": "Isaiah",
      "C": "Ezekiel",
      "D": "Daniel"
    },
    "answer": "B",
    "explanation": "Isaiah prophesied about the birth of Immanuel (Isaiah 7:14)."
  },
  {
    "id": "36",
    "year": "2016",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was the site of Jesus’ crucifixion?",
    "options": {
      "A": "Nazareth",
      "B": "Jerusalem",
      "C": "Bethlehem",
      "D": "Capernaum"
    },
    "answer": "B",
    "explanation": "Jesus was crucified in Jerusalem (Matthew 27:33–35)."
  },
  {
    "id": "37",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the queen who visited Solomon?",
    "options": {
      "A": "Queen of Sheba",
      "B": "Jezebel",
      "C": "Esther",
      "D": "Bathsheba"
    },
    "answer": "A",
    "explanation": "The Queen of Sheba visited Solomon to test his wisdom (1 Kings 10:1–13)."
  },
  {
    "id": "38",
    "year": "2021",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the first martyr of the Christian church?",
    "options": {
      "A": "Stephen",
      "B": "James",
      "C": "Peter",
      "D": "Paul"
    },
    "answer": "A",
    "explanation": "Stephen was stoned to death for his faith (Acts 7:54–60)."
  },
  {
    "id": "39",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was thrown into a lions’ den for praying to God?",
    "options": {
      "A": "Daniel",
      "B": "Shadrach",
      "C": "Meshach",
      "D": "Abednego"
    },
    "answer": "A",
    "explanation": "Daniel was thrown into the lions’ den but was protected by God (Daniel 6)."
  },
  {
    "id": "40",
    "year": "2006",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable teaches about a man who helped a wounded stranger?",
    "options": {
      "A": "The Prodigal Son",
      "B": "The Good Samaritan",
      "C": "The Sower",
      "D": "The Lost Sheep"
    },
    "answer": "B",
    "explanation": "The Good Samaritan parable teaches about loving one’s neighbor (Luke 10:25–37)."
  },
  {
    "id": "41",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that committed suicide after being wounded in battle?",
    "options": {
      "A": "Saul",
      "B": "David",
      "C": "Ahab",
      "D": "Josiah"
    },
    "answer": "A",
    "explanation": "Saul killed himself after being wounded in battle (1 Samuel 31:4)."
  },
  {
    "id": "42",
    "year": "2004",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the sister of Lazarus?",
    "options": {
      "A": "Mary Magdalene",
      "B": "Martha",
      "C": "Joanna",
      "D": "Salome"
    },
    "answer": "B",
    "explanation": "Martha, along with her sister Mary, was a sister of Lazarus (John 11:1–2)."
  },
  {
    "id": "43",
    "year": "2017",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the city destroyed by fire along with Sodom?",
    "options": {
      "A": "Gomorrah",
      "B": "Jericho",
      "C": "Ai",
      "D": "Nineveh"
    },
    "answer": "A",
    "explanation": "Sodom and Gomorrah were destroyed by God for their wickedness (Genesis 19:24–25)."
  },
  {
    "id": "44",
    "year": "2013",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which apostle was originally called Saul?",
    "options": {
      "A": "Peter",
      "B": "Paul",
      "C": "Barnabas",
      "D": "Silas"
    },
    "answer": "B",
    "explanation": "Saul, a persecutor of Christians, became Paul after his conversion (Acts 9:1–19)."
  },
  {
    "id": "45",
    "year": "2001",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that married Gomer as a sign of Israel’s unfaithfulness?",
    "options": {
      "A": "Hosea",
      "B": "Joel",
      "C": "Amos",
      "D": "Micah"
    },
    "answer": "A",
    "explanation": "Hosea married Gomer as a symbol of God’s relationship with Israel (Hosea 1:2–3)."
  },
  {
    "id": "46",
    "year": "2022",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the name of the tax collector who climbed a tree to see Jesus?",
    "options": {
      "A": "Matthew",
      "B": "Zacchaeus",
      "C": "Levi",
      "D": "Simon"
    },
    "answer": "B",
    "explanation": "Zacchaeus climbed a sycamore tree to see Jesus (Luke 19:1–10)."
  },
  {
    "id": "47",
    "year": "2000",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that defeated Goliath’s brothers?",
    "options": {
      "A": "Saul",
      "B": "David",
      "C": "Jonathan",
      "D": "Abner"
    },
    "answer": "B",
    "explanation": "David’s men killed Goliath’s brothers during later battles (2 Samuel 21:19)."
  },
  {
    "id": "48",
    "year": "2023",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which book records the early history of the Christian church?",
    "options": {
      "A": "Romans",
      "B": "Acts",
      "C": "Galatians",
      "D": "Revelation"
    },
    "answer": "B",
    "explanation": "The Acts of the Apostles details the early church’s growth (Acts 1–28)."
  },
  {
    "id": "49",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the tower built to reach heaven?",
    "options": {
      "A": "Babel",
      "B": "Siloam",
      "C": "Ziggurat",
      "D": "Eden"
    },
    "answer": "A",
    "explanation": "The Tower of Babel was built to reach the heavens, leading to God confusing languages (Genesis 11:1–9)."
  },
  {
    "id": "50",
    "year": "2010",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the high priest who questioned Jesus during His trial?",
    "options": {
      "A": "Annas",
      "B": "Caiaphas",
      "C": "Gamaliel",
      "D": "Sadducee"
    },
    "answer": "B",
    "explanation": "Caiaphas was the high priest during Jesus’ trial (Matthew 26:57–68)."
  },
  {
    "id": "51",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the judge known for his strength and long hair?",
    "options": {
      "A": "Gideon",
      "B": "Samson",
      "C": "Ehud",
      "D": "Othniel"
    },
    "answer": "B",
    "explanation": "Samson’s strength was tied to his Nazirite vow, including not cutting his hair (Judges 13–16)."
  },
  {
    "id": "52",
    "year": "2008",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple denied Jesus three times before the rooster crowed?",
    "options": {
      "A": "Peter",
      "B": "John",
      "C": "James",
      "D": "Andrew"
    },
    "answer": "A",
    "explanation": "Peter denied knowing Jesus three times, as Jesus had predicted (Luke 22:54–62)."
  },
  {
    "id": "53",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that interpreted Nebuchadnezzar’s dream?",
    "options": {
      "A": "Daniel",
      "B": "Ezekiel",
      "C": "Jeremiah",
      "D": "Isaiah"
    },
    "answer": "A",
    "explanation": "Daniel interpreted the king’s dream about a statue (Daniel 2)."
  },
  {
    "id": "54",
    "year": "2003",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the name of the place where Jesus prayed before His arrest?",
    "options": {
      "A": "Gethsemane",
      "B": "Golgotha",
      "C": "Bethany",
      "D": "Capernaum"
    },
    "answer": "A",
    "explanation": "Jesus prayed in the Garden of Gethsemane before His arrest (Matthew 26:36–46)."
  },
  {
    "id": "55",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the wife of Ahab who promoted Baal worship?",
    "options": {
      "A": "Jezebel",
      "B": "Athaliah",
      "C": "Vashti",
      "D": "Esther"
    },
    "answer": "A",
    "explanation": "Jezebel promoted Baal worship in Israel (1 Kings 16:31–33)."
  },
  {
    "id": "56",
    "year": "2007",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which woman anointed Jesus’ feet with perfume?",
    "options": {
      "A": "Mary Magdalene",
      "B": "Martha",
      "C": "Mary of Bethany",
      "D": "Joanna"
    },
    "answer": "C",
    "explanation": "Mary of Bethany anointed Jesus’ feet with costly perfume (John 12:1–8)."
  },
  {
    "id": "57",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the city where Esther became queen?",
    "options": {
      "A": "Jerusalem",
      "B": "Babylon",
      "C": "Susa",
      "D": "Nineveh"
    },
    "answer": "C",
    "explanation": "Esther became queen in Susa, the Persian capital (Esther 2:5–17)."
  },
  {
    "id": "58",
    "year": "2020",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which epistle was written by Paul to address issues in the church at Corinth?",
    "options": {
      "A": "Romans",
      "B": "Galatians",
      "C": "1 Corinthians",
      "D": "Ephesians"
    },
    "answer": "C",
    "explanation": "1 Corinthians addresses various issues in the Corinthian church (1 Corinthians 1–16)."
  },
  {
    "id": "59",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the father of Methuselah?",
    "options": {
      "A": "Enoch",
      "B": "Noah",
      "C": "Lamech",
      "D": "Jared"
    },
    "answer": "A",
    "explanation": "Enoch was the father of Methuselah, known for his long life (Genesis 5:21–27)."
  },
  {
    "id": "60",
    "year": "2016",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the angel that announced Jesus’ birth to the shepherds?",
    "options": {
      "A": "Gabriel",
      "B": "Michael",
      "C": "Raphael",
      "D": "Uriel"
    },
    "answer": "A",
    "explanation": "The angel Gabriel announced Jesus’ birth to the shepherds (Luke 2:8–14)."
  },
  {
    "id": "61",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who wrestled with Jacob?",
    "options": {
      "A": "Esau",
      "B": "Laban",
      "C": "Angel of God",
      "D": "Isaac"
    },
    "answer": "C",
    "explanation": "Jacob wrestled with an angel of God, who blessed him (Genesis 32:24–30)."
  },
  {
    "id": "62",
    "year": "2021",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was a zealot?",
    "options": {
      "A": "Simon",
      "B": "Andrew",
      "C": "Philip",
      "D": "Bartholomew"
    },
    "answer": "A",
    "explanation": "Simon the Zealot was one of Jesus’ twelve disciples (Luke 6:15)."
  },
  {
    "id": "63",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that had a dream about seven fat and seven lean cows?",
    "options": {
      "A": "Nebuchadnezzar",
      "B": "Pharaoh",
      "C": "Ahasuerus",
      "D": "Belshazzar"
    },
    "answer": "B",
    "explanation": "Pharaoh’s dream was interpreted by Joseph (Genesis 41:1–36)."
  },
  {
    "id": "64",
    "year": "2006",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the name of the man Jesus raised from the dead in Bethany?",
    "options": {
      "A": "Jairus",
      "B": "Lazarus",
      "C": "Bartimaeus",
      "D": "Eutychus"
    },
    "answer": "B",
    "explanation": "Jesus raised Lazarus from the dead in Bethany (John 11:1–44)."
  },
  {
    "id": "65",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that confronted David about his sin with Bathsheba?",
    "options": {
      "A": "Samuel",
      "B": "Nathan",
      "C": "Gad",
      "D": "Ahijah"
    },
    "answer": "B",
    "explanation": "Nathan rebuked David for his sin with Bathsheba (2 Samuel 12:1–14)."
  },
  {
    "id": "66",
    "year": "2004",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves a son who squandered his inheritance?",
    "options": {
      "A": "The Good Samaritan",
      "B": "The Prodigal Son",
      "C": "The Sower",
      "D": "The Talents"
    },
    "answer": "B",
    "explanation": "The Prodigal Son parable teaches about forgiveness and restoration (Luke 15:11–32)."
  },
  {
    "id": "67",
    "year": "2017",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the priest who raised Samuel?",
    "options": {
      "A": "Eli",
      "B": "Aaron",
      "C": "Zadok",
      "D": "Phinehas"
    },
    "answer": "A",
    "explanation": "Eli raised Samuel in the temple at Shiloh (1 Samuel 1:24–28)."
  },
  {
    "id": "68",
    "year": "2013",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the first person to see Jesus after His resurrection?",
    "options": {
      "A": "Peter",
      "B": "Mary Magdalene",
      "C": "John",
      "D": "Thomas"
    },
    "answer": "B",
    "explanation": "Mary Magdalene was the first to see the risen Jesus (John 20:11–18)."
  },
  {
    "id": "69",
    "year": "2001",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the son of Abraham by Hagar?",
    "options": {
      "A": "Isaac",
      "B": "Ishmael",
      "C": "Jacob",
      "D": "Esau"
    },
    "answer": "B",
    "explanation": "Ishmael was born to Abraham through Hagar, Sarah’s servant (Genesis 16:15)."
  },
  {
    "id": "70",
    "year": "2022",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was Paul headed to when he was converted?",
    "options": {
      "A": "Jerusalem",
      "B": "Damascus",
      "C": "Antioch",
      "D": "Corinth"
    },
    "answer": "B",
    "explanation": "Paul was on the road to Damascus when he encountered Jesus (Acts 9:1–9)."
  },
  {
    "id": "71",
    "year": "2000",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who built an ark to save his family?",
    "options": {
      "A": "Noah",
      "B": "Enoch",
      "C": "Methuselah",
      "D": "Lamech"
    },
    "answer": "A",
    "explanation": "Noah built an ark as God commanded to survive the flood (Genesis 6:13–22)."
  },
  {
    "id": "72",
    "year": "2023",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was a fisherman before following Jesus?",
    "options": {
      "A": "Matthew",
      "B": "Peter",
      "C": "Thomas",
      "D": "Judas"
    },
    "answer": "B",
    "explanation": "Peter was a fisherman when Jesus called him (Matthew 4:18–20)."
  },
  {
    "id": "73",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that fled from Jezebel to Mount Horeb?",
    "options": {
      "A": "Elijah",
      "B": "Elisha",
      "C": "Obadiah",
      "D": "Micah"
    },
    "answer": "A",
    "explanation": "Elijah fled to Mount Horeb after confronting Jezebel’s prophets (1 Kings 19:1–8)."
  },
  {
    "id": "74",
    "year": "2010",
    "subject": "CRK",
    "type": "New Testament",
    "question": "What was the name of the blind man healed by Jesus in Jericho?",
    "options": {
      "A": "Lazarus",
      "B": "Bartimaeus",
      "C": "Zacchaeus",
      "D": "Eutychus"
    },
    "answer": "B",
    "explanation": "Bartimaeus received his sight from Jesus in Jericho (Mark 10:46–52)."
  },
  {
    "id": "75",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the woman who hid the Israelite spies in Jericho?",
    "options": {
      "A": "Rahab",
      "B": "Deborah",
      "C": "Jael",
      "D": "Ruth"
    },
    "answer": "A",
    "explanation": "Rahab hid the spies and was spared during Jericho’s fall (Joshua 2:1–21)."
  },
  {
    "id": "76",
    "year": "2008",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which mountain is associated with Jesus’ transfiguration?",
    "options": {
      "A": "Sinai",
      "B": "Tabor",
      "C": "Zion",
      "D": "Olives"
    },
    "answer": "B",
    "explanation": "Jesus was transfigured on Mount Tabor (Matthew 17:1–9)."
  },
  {
    "id": "77",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that repented after Jonah’s preaching?",
    "options": {
      "A": "Ahab",
      "B": "King of Nineveh",
      "C": "Hezekiah",
      "D": "Josiah"
    },
    "answer": "B",
    "explanation": "The King of Nineveh led the city in repentance after Jonah’s message (Jonah 3:6–10)."
  },
  {
    "id": "78",
    "year": "2003",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was called to walk on water with Jesus?",
    "options": {
      "A": "John",
      "B": "Peter",
      "C": "James",
      "D": "Andrew"
    },
    "answer": "B",
    "explanation": "Peter walked on water toward Jesus but began to sink due to doubt (Matthew 14:28–31)."
  },
  {
    "id": "79",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who offered his daughters to save Lot’s guests?",
    "options": {
      "A": "Abraham",
      "B": "Lot",
      "C": "Laban",
      "D": "Isaac"
    },
    "answer": "B",
    "explanation": "Lot offered his daughters to protect his angelic guests in Sodom (Genesis 19:1–8)."
  },
  {
    "id": "80",
    "year": "2007",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which Gospel is written by a physician?",
    "options": {
      "A": "Matthew",
      "B": "Mark",
      "C": "Luke",
      "D": "John"
    },
    "answer": "C",
    "explanation": "Luke, a physician, wrote the Gospel of Luke (Colossians 4:14)."
  },
  {
    "id": "81",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that saw a vision of dry bones coming to life?",
    "options": {
      "A": "Isaiah",
      "B": "Jeremiah",
      "C": "Ezekiel",
      "D": "Daniel"
    },
    "answer": "C",
    "explanation": "Ezekiel saw the vision of the valley of dry bones (Ezekiel 37:1–14)."
  },
  {
    "id": "82",
    "year": "2020",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which woman was healed by touching Jesus’ garment?",
    "options": {
      "A": "Mary Magdalene",
      "B": "Woman with the issue of blood",
      "C": "Martha",
      "D": "Lydia"
    },
    "answer": "B",
    "explanation": "The woman with the issue of blood was healed by touching Jesus’ garment (Mark 5:25–34)."
  },
  {
    "id": "83",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the son of David who tried to seize the throne?",
    "options": {
      "A": "Solomon",
      "B": "Absalom",
      "C": "Adonijah",
      "D": "Amnon"
    },
    "answer": "B",
    "explanation": "Absalom rebelled against David to take the throne (2 Samuel 15:1–12)."
  },
  {
    "id": "84",
    "year": "2016",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves a mustard seed?",
    "options": {
      "A": "The Sower",
      "B": "The Prodigal Son",
      "C": "The Mustard Seed",
      "D": "The Talents"
    },
    "answer": "C",
    "explanation": "The Mustard Seed parable teaches about the growth of God’s kingdom (Matthew 13:31–32)."
  },
  {
    "id": "85",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that saw the handwriting on the wall?",
    "options": {
      "A": "Nebuchadnezzar",
      "B": "Belshazzar",
      "C": "Darius",
      "D": "Cyrus"
    },
    "answer": "B",
    "explanation": "Belshazzar saw the handwriting on the wall, interpreted by Daniel (Daniel 5:5–31)."
  },
  {
    "id": "86",
    "year": "2021",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Who was the companion of Paul on his first missionary journey?",
    "options": {
      "A": "Silas",
      "B": "Timothy",
      "C": "Barnabas",
      "D": "Luke"
    },
    "answer": "C",
    "explanation": "Barnabas accompanied Paul on his first missionary journey (Acts 13:1–3)."
  },
  {
    "id": "87",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the woman who became Boaz’s wife?",
    "options": {
      "A": "Ruth",
      "B": "Naomi",
      "C": "Orpah",
      "D": "Tamar"
    },
    "answer": "A",
    "explanation": "Ruth married Boaz and became an ancestor of David (Ruth 4:13–22)."
  },
  {
    "id": "88",
    "year": "2006",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was known as the ‘city of David’ in the New Testament?",
    "options": {
      "A": "Jerusalem",
      "B": "Bethlehem",
      "C": "Nazareth",
      "D": "Hebron"
    },
    "answer": "B",
    "explanation": "Bethlehem is called the city of David, where Jesus was born (Luke 2:4)."
  },
  {
    "id": "89",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that predicted the fall of Samaria?",
    "options": {
      "A": "Hosea",
      "B": "Amos",
      "C": "Micah",
      "D": "Joel"
    },
    "answer": "B",
    "explanation": "Amos prophesied against the northern kingdom, including Samaria’s fall (Amos 3:9–15)."
  },
  {
    "id": "90",
    "year": "2004",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was the brother of John?",
    "options": {
      "A": "Peter",
      "B": "James",
      "C": "Andrew",
      "D": "Philip"
    },
    "answer": "B",
    "explanation": "James, the son of Zebedee, was John’s brother (Mark 1:19)."
  },
  {
    "id": "91",
    "year": "2017",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who sold his birthright to Jacob?",
    "options": {
      "A": "Esau",
      "B": "Reuben",
      "C": "Joseph",
      "D": "Benjamin"
    },
    "answer": "A",
    "explanation": "Esau sold his birthright to Jacob for a bowl of stew (Genesis 25:29–34)."
  },
  {
    "id": "92",
    "year": "2013",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which miracle involved Jesus feeding 5,000 people?",
    "options": {
      "A": "Walking on water",
      "B": "Feeding the 5,000",
      "C": "Healing the blind",
      "D": "Raising Lazarus"
    },
    "answer": "B",
    "explanation": "Jesus fed 5,000 with five loaves and two fish (Matthew 14:13–21)."
  },
  {
    "id": "93",
    "year": "2001",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that was fed by ravens?",
    "options": {
      "A": "Elijah",
      "B": "Elisha",
      "C": "Isaiah",
      "D": "Jeremiah"
    },
    "answer": "A",
    "explanation": "God sent ravens to feed Elijah during a drought (1 Kings 17:2–6)."
  },
  {
    "id": "94",
    "year": "2022",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which woman was a seller of purple goods and hosted Paul?",
    "options": {
      "A": "Lydia",
      "B": "Priscilla",
      "C": "Dorcas",
      "D": "Phoebe"
    },
    "answer": "A",
    "explanation": "Lydia, a seller of purple, hosted Paul in Philippi (Acts 16:14–15)."
  },
  {
    "id": "95",
    "year": "2000",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the city where David was anointed king?",
    "options": {
      "A": "Jerusalem",
      "B": "Hebron",
      "C": "Bethlehem",
      "D": "Shiloh"
    },
    "answer": "C",
    "explanation": "David was anointed king in Bethlehem by Samuel (1 Samuel 16:1–13)."
  },
  {
    "id": "96",
    "year": "2023",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which epistle emphasizes faith without works is dead?",
    "options": {
      "A": "Romans",
      "B": "James",
      "C": "Hebrews",
      "D": "1 Peter"
    },
    "answer": "B",
    "explanation": "The Book of James teaches that faith without works is dead (James 2:14–26)."
  },
  {
    "id": "97",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that called down fire from heaven on Mount Carmel?",
    "options": {
      "A": "Elijah",
      "B": "Elisha",
      "C": "Nathan",
      "D": "Gad"
    },
    "answer": "A",
    "explanation": "Elijah called down fire to prove God’s power over Baal (1 Kings 18:20–40)."
  },
  {
    "id": "98",
    "year": "2010",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was crucified upside down according to tradition?",
    "options": {
      "A": "Peter",
      "B": "Paul",
      "C": "James",
      "D": "John"
    },
    "answer": "A",
    "explanation": "Peter was crucified upside down, as he felt unworthy to die like Jesus."
  },
  {
    "id": "99",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who led a rebellion against Moses?",
    "options": {
      "A": "Korah",
      "B": "Balaam",
      "C": "Dathan",
      "D": "Abiram"
    },
    "answer": "A",
    "explanation": "Korah led a rebellion against Moses’ authority (Numbers 16:1–35)."
  },
  {
    "id": "100",
    "year": "2008",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves a man who found a treasure in a field?",
    "options": {
      "A": "The Pearl of Great Price",
      "B": "The Hidden Treasure",
      "C": "The Lost Sheep",
      "D": "The Sower"
    },
    "answer": "B",
    "explanation": "The Hidden Treasure parable teaches about the value of God’s kingdom (Matthew 13:44)."
  },
  {
    "id": "101",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that predicted the exile to Babylon?",
    "options": {
      "A": "Isaiah",
      "B": "Jeremiah",
      "C": "Ezekiel",
      "D": "Hosea"
    },
    "answer": "B",
    "explanation": "Jeremiah warned Judah of the Babylonian exile (Jeremiah 25:8–11)."
  },
  {
    "id": "102",
    "year": "2003",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was the first to recognize Jesus as the Messiah?",
    "options": {
      "A": "Peter",
      "B": "John",
      "C": "Andrew",
      "D": "Philip"
    },
    "answer": "A",
    "explanation": "Peter declared Jesus as the Messiah (Matthew 16:16)."
  },
  {
    "id": "103",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who was swallowed by a great fish?",
    "options": {
      "A": "Jonah",
      "B": "Elijah",
      "C": "Elisha",
      "D": "Isaiah"
    },
    "answer": "A",
    "explanation": "Jonah was swallowed by a great fish for disobeying God (Jonah 1:17)."
  },
  {
    "id": "104",
    "year": "2007",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was the destination of Paul’s final journey in Acts?",
    "options": {
      "A": "Jerusalem",
      "B": "Rome",
      "C": "Antioch",
      "D": "Ephesus"
    },
    "answer": "B",
    "explanation": "Paul was taken to Rome as a prisoner (Acts 28:16)."
  },
  {
    "id": "105",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that married Esther?",
    "options": {
      "A": "Darius",
      "B": "Cyrus",
      "C": "Ahasuerus",
      "D": "Artaxerxes"
    },
    "answer": "C",
    "explanation": "Esther became the queen of King Ahasuerus (Esther 2:17)."
  },
  {
    "id": "106",
    "year": "2020",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was known as the ‘beloved disciple’?",
    "options": {
      "A": "Peter",
      "B": "John",
      "C": "James",
      "D": "Andrew"
    },
    "answer": "B",
    "explanation": "John is traditionally identified as the ‘disciple whom Jesus loved’ (John 19:26)."
  },
  {
    "id": "107",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who killed Sisera with a tent peg?",
    "options": {
      "A": "Deborah",
      "B": "Jael",
      "C": "Barak",
      "D": "Gideon"
    },
    "answer": "B",
    "explanation": "Jael killed Sisera by driving a tent peg through his head (Judges 4:21)."
  },
  {
    "id": "108",
    "year": "2016",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves ten virgins waiting for a bridegroom?",
    "options": {
      "A": "The Ten Virgins",
      "B": "The Prodigal Son",
      "C": "The Good Samaritan",
      "D": "The Sower"
    },
    "answer": "A",
    "explanation": "The Ten Virgins parable teaches about readiness for Christ’s return (Matthew 25:1–13)."
  },
  {
    "id": "109",
    "year": "2002",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that succeeded Elijah?",
    "options": {
      "A": "Elisha",
      "B": "Isaiah",
      "C": "Jeremiah",
      "D": "Hosea"
    },
    "answer": "A",
    "explanation": "Elisha received Elijah’s mantle and continued his prophetic ministry (2 Kings 2:9–15)."
  },
  {
    "id": "110",
    "year": "2021",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which woman was raised from the dead by Peter?",
    "options": {
      "A": "Lydia",
      "B": "Dorcas",
      "C": "Priscilla",
      "D": "Phoebe"
    },
    "answer": "B",
    "explanation": "Peter raised Dorcas, also called Tabitha, from the dead (Acts 9:36–41)."
  },
  {
    "id": "111",
    "year": "2011",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who was the first murderer?",
    "options": {
      "A": "Cain",
      "B": "Abel",
      "C": "Seth",
      "D": "Enoch"
    },
    "answer": "A",
    "explanation": "Cain killed his brother Abel out of jealousy (Genesis 4:8)."
  },
  {
    "id": "112",
    "year": "2006",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple replaced Judas Iscariot?",
    "options": {
      "A": "Matthias",
      "B": "Barnabas",
      "C": "Silas",
      "D": "Timothy"
    },
    "answer": "A",
    "explanation": "Matthias was chosen by lot to replace Judas (Acts 1:26)."
  },
  {
    "id": "113",
    "year": "2019",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that rebuilt Jericho at the cost of his sons?",
    "options": {
      "A": "Ahab",
      "B": "Hiel",
      "C": "Jeroboam",
      "D": "Omri"
    },
    "answer": "B",
    "explanation": "Hiel rebuilt Jericho, losing his sons as a curse (1 Kings 16:34)."
  },
  {
    "id": "114",
    "year": "2004",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which epistle was written to encourage perseverance in trials?",
    "options": {
      "A": "Romans",
      "B": "Hebrews",
      "C": "1 Peter",
      "D": "James"
    },
    "answer": "D",
    "explanation": "James encourages believers to persevere through trials (James 1:2–4)."
  },
  {
    "id": "115",
    "year": "2017",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who interpreted the writing on the wall?",
    "options": {
      "A": "Daniel",
      "B": "Joseph",
      "C": "Ezra",
      "D": "Nehemiah"
    },
    "answer": "A",
    "explanation": "Daniel interpreted the writing on the wall for Belshazzar (Daniel 5:25–28)."
  },
  {
    "id": "116",
    "year": "2013",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was the site of Pentecost in Acts?",
    "options": {
      "A": "Jerusalem",
      "B": "Antioch",
      "C": "Ephesus",
      "D": "Corinth"
    },
    "answer": "A",
    "explanation": "The Holy Spirit descended on the disciples in Jerusalem at Pentecost (Acts 2:1–4)."
  },
  {
    "id": "117",
    "year": "2001",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that rebuilt the walls of Jerusalem?",
    "options": {
      "A": "Ezra",
      "B": "Nehemiah",
      "C": "Haggai",
      "D": "Zechariah"
    },
    "answer": "B",
    "explanation": "Nehemiah led the rebuilding of Jerusalem’s walls (Nehemiah 2:11–20)."
  },
  {
    "id": "118",
    "year": "2022",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was a tentmaker by trade?",
    "options": {
      "A": "Peter",
      "B": "Paul",
      "C": "John",
      "D": "James"
    },
    "answer": "B",
    "explanation": "Paul worked as a tentmaker to support his ministry (Acts 18:3)."
  },
  {
    "id": "119",
    "year": "2000",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who led the Exodus from Egypt?",
    "options": {
      "A": "Aaron",
      "B": "Moses",
      "C": "Joshua",
      "D": "Caleb"
    },
    "answer": "B",
    "explanation": "Moses led the Israelites out of Egypt (Exodus 12:31–42)."
  },
  {
    "id": "120",
    "year": "2023",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves a vineyard owner and tenants?",
    "options": {
      "A": "The Sower",
      "B": "The Tenants",
      "C": "The Prodigal Son",
      "D": "The Lost Sheep"
    },
    "answer": "B",
    "explanation": "The Parable of the Tenants teaches about rejecting God’s messengers (Matthew 21:33–46)."
  },
  {
    "id": "121",
    "year": "2005",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that was thrown into a cistern?",
    "options": {
      "A": "Isaiah",
      "B": "Jeremiah",
      "C": "Ezekiel",
      "D": "Hosea"
    },
    "answer": "B",
    "explanation": "Jeremiah was thrown into a cistern for his prophecies (Jeremiah 38:6)."
  },
  {
    "id": "122",
    "year": "2010",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was the treasurer for Jesus and His disciples?",
    "options": {
      "A": "Peter",
      "B": "Judas Iscariot",
      "C": "Matthew",
      "D": "Thomas"
    },
    "answer": "B",
    "explanation": "Judas Iscariot managed the money for Jesus’ group (John 12:6)."
  },
  {
    "id": "123",
    "year": "2015",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who was a leper healed by Elisha?",
    "options": {
      "A": "Naaman",
      "B": "Gehazi",
      "C": "Uzziah",
      "D": "Joab"
    },
    "answer": "A",
    "explanation": "Naaman was healed of leprosy by Elisha (2 Kings 5:1–14)."
  },
  {
    "id": "124",
    "year": "2008",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which city was the home of Cornelius, the first Gentile convert?",
    "options": {
      "A": "Joppa",
      "B": "Caesarea",
      "C": "Antioch",
      "D": "Damascus"
    },
    "answer": "B",
    "explanation": "Cornelius, a centurion in Caesarea, was baptized by Peter (Acts 10:1–48)."
  },
  {
    "id": "125",
    "year": "2012",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the king that was struck with leprosy for burning incense?",
    "options": {
      "A": "Uzziah",
      "B": "Hezekiah",
      "C": "Josiah",
      "D": "Manasseh"
    },
    "answer": "A",
    "explanation": "Uzziah was struck with leprosy for unlawfully burning incense (2 Chronicles 26:16–21)."
  },
  {
    "id": "126",
    "year": "2003",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was a tax collector before following Jesus?",
    "options": {
      "A": "Peter",
      "B": "Matthew",
      "C": "John",
      "D": "James"
    },
    "answer": "B",
    "explanation": "Matthew was a tax collector when Jesus called him (Matthew 9:9)."
  },
  {
    "id": "127",
    "year": "2018",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who was a cupbearer to the king of Persia?",
    "options": {
      "A": "Ezra",
      "B": "Nehemiah",
      "C": "Mordecai",
      "D": "Haggai"
    },
    "answer": "B",
    "explanation": "Nehemiah was the cupbearer to King Artaxerxes (Nehemiah 1:11)."
  },
  {
    "id": "128",
    "year": "2007",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which parable involves a man who built his house on rock?",
    "options": {
      "A": "The Wise and Foolish Builders",
      "B": "The Sower",
      "C": "The Prodigal Son",
      "D": "The Good Samaritan"
    },
    "answer": "A",
    "explanation": "The Wise and Foolish Builders parable teaches about a strong foundation (Matthew 7:24–27)."
  },
  {
    "id": "129",
    "year": "2014",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "Who was the prophet that predicted a new covenant with Israel?",
    "options": {
      "A": "Isaiah",
      "B": "Jeremiah",
      "C": "Ezekiel",
      "D": "Hosea"
    },
    "answer": "B",
    "explanation": "Jeremiah prophesied about a new covenant (Jeremiah 31:31–34)."
  },
  {
    "id": "130",
    "year": "2020",
    "subject": "CRK",
    "type": "New Testament",
    "question": "Which disciple was a brother of Andrew?",
    "options": {
      "A": "Peter",
      "B": "James",
      "C": "John",
      "D": "Philip"
    },
    "answer": "A",
    "explanation": "Peter, also called Simon, was Andrew’s brother (Matthew 4:18)."
  },
  {
    "id": "131",
    "year": "2009",
    "subject": "CRK",
    "type": "Old Testament",
    "question": "What was the name of the man who was a scribe and priest in the time of Nehemiah?",
    "options": {
      "A": "Ezra",
      "B": "Nehemiah",
      "C": "Mordecai",
      "D": "Haggai"
    },
    "answer": "A",
    "explanation": "Ezra was a scribe and priest who taught the law (Ezra 7:1–10)."
  }



]