"use strict";

const STORAGE_KEY = "bringItOnPythonProgressV1";
const app = document.getElementById("app");

const iconPaths = {
  home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
  code: '<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 4-4 16"/>',
  flow: '<path d="M6 3h12v6H6z"/><path d="M12 9v3"/><path d="M6 15h12v6H6z"/><path d="M8 12h8"/>',
  decision: '<path d="m12 3 9 9-9 9-9-9 9-9z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  loop: '<path d="M17 2v5h-5"/><path d="M20 12a8 8 0 1 1-2.34-5.66L17 7"/>',
  braces: '<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
  cards: '<rect x="4" y="7" width="13" height="14" rx="2"/><path d="M8 3h10a2 2 0 0 1 2 2v12"/><path d="M8 12h5"/><path d="M8 16h3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
  back: '<path d="M15 18 9 12l6-6"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  reset: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/>',
  trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M5 5H3v2a4 4 0 0 0 4 4"/><path d="M19 5h2v2a4 4 0 0 1-4 4"/>',
  raptor: '<path d="M4 4h16v16H4z"/><path d="M8 8h8v4H8z"/><path d="M12 12v4"/><path d="M8 16h8"/>'
};

const colors = ["#baff39", "#63e6de", "#ffd166", "#ff7c7c", "#c7a6ff", "#8ee6a2"];

const topics = [
  {
    id: "map",
    title: "Study Map",
    icon: "book",
    summary: "How the class material fits together before you write pseudocode, RAPTOR, or Python.",
    tags: ["process", "source map", "study flow"],
    lessons: [
      {
        title: "The Big Route",
        body: [
          "Beginner programming is one idea said in several forms. A word problem is the story. IPO is the sorting table. Pseudocode is the plan. RAPTOR is the picture. Python is the real code.",
          "When the story feels confusing, do not start with code. Start by naming the inputs, the processing, and the outputs. Then add decisions or loops only if the problem actually needs them.",
          "The course materials repeat this pattern across simple calculations, conversions, recipe scaling, bank balances, shipping discounts, and calculator problems."
        ],
        keyPoints: [
          "Word problem -> IPO -> pseudocode -> RAPTOR -> Python.",
          "Every line should have a job: get data, calculate, decide, repeat, or display.",
          "Use only techniques already covered by the assignment."
        ],
        example: {
          title: "Tiny route",
          lines: [
            "Story: Ask for hours and pay rate. Display gross pay.",
            "IPO: hours, payRate -> hours * payRate -> grossPay.",
            "Pseudocode: Input hours, Input payRate, Set grossPay, Write grossPay.",
            "RAPTOR: Output prompt, Input, Assignment, Output.",
            "Python: input(), float(), assignment, print()."
          ]
        },
        remember: "If you can explain the IPO in one sentence, the rest becomes much easier."
      },
      {
        title: "The Program Development Cycle",
        body: [
          "The design step comes before coding. Read the problem, understand what is known and unknown, design the steps, write the program, test it, and fix mistakes.",
          "The cycle is allowed to loop. If a test fails, you may return to the design and make the plan clearer before changing the code.",
          "A good design is specific. A weak step says calculate total. A stronger step says Set total = price * quantity."
        ],
        keyPoints: [
          "Understand the problem first.",
          "Write the algorithm before typing Python.",
          "Test with small values you can check by hand."
        ],
        pseudocode: [
          "1. Start",
          "2. Read the problem twice",
          "3. List the inputs, processing, and outputs",
          "4. Write exact formulas and decisions",
          "5. Test the steps with sample data",
          "6. End"
        ],
        remember: "The computer follows your steps literally, so your design has to be literal too."
      },
      {
        title: "Academic-Friendly Practice",
        body: [
          "The safest way to study is to practice patterns without copying assignment answers. Use similar numbers, make your own variable names, and explain the logic in your own words.",
          "When you review an assignment-style problem, separate the reusable pattern from the specific prompt. The pattern can become a study example. The exact homework wording should stay out of public code.",
          "This app uses paraphrased practice patterns from the provided course files so you can learn the method without publishing assignment text."
        ],
        keyPoints: [
          "Practice the process, not a copy-paste answer.",
          "Use descriptive names that match your own solution.",
          "Trace values line by line until the result makes sense."
        ],
        remember: "Your instructor wants your thinking. Pseudocode is where that thinking becomes visible."
      }
    ]
  },
  {
    id: "computer-basics",
    title: "Computer Basics",
    icon: "flow",
    summary: "Core vocabulary from computer systems and early programming chapters.",
    tags: ["CPU", "memory", "languages"],
    lessons: [
      {
        title: "Hardware, Software, and Memory",
        body: [
          "Hardware is the physical machine. Software is the set of instructions that makes the machine do work.",
          "The CPU carries out instructions. RAM is temporary working memory. When power is off, normal RAM contents are lost. Storage keeps files longer term.",
          "Programs move data through memory. A variable is a name that lets the program reach a value stored while the program runs."
        ],
        keyPoints: [
          "CPU executes instructions.",
          "RAM is temporary.",
          "Storage is for saved files and programs."
        ],
        remember: "A program is instructions plus data moving through memory."
      },
      {
        title: "Programming Languages",
        body: [
          "A machine only understands very low-level instructions, but people usually write programs in high-level languages such as Python.",
          "Assembly language is closer to the machine and can be useful when a programmer needs detailed control of hardware or speed.",
          "A compiled language translates a program into machine code before it runs. Python is usually interpreted, meaning the interpreter reads and executes statements as the program runs."
        ],
        keyPoints: [
          "High-level languages are easier for people.",
          "Assembly is close to the hardware.",
          "Compilers and interpreters both translate human-written code for the computer."
        ],
        remember: "Programming languages are bridges between human plans and machine instructions."
      },
      {
        title: "Boolean Data",
        body: [
          "Boolean data has only two possible values: true or false.",
          "A Boolean expression asks a yes/no question, such as quantity > 0 or operator == '+'.",
          "Selections, loops, validation, and many Python conditions are powered by Boolean logic."
        ],
        keyPoints: [
          "True and false are values.",
          "Comparisons create Boolean results.",
          "AND, OR, and NOT combine or reverse Boolean results."
        ],
        python: [
          "quantity = 12",
          "is_valid = quantity > 0",
          "print(is_valid)  # True"
        ],
        remember: "Every If diamond in RAPTOR is really asking a Boolean question."
      }
    ]
  },
  {
    id: "word-problems",
    title: "Word Problems",
    icon: "search",
    summary: "Turn plain English into variables, formulas, decisions, and outputs.",
    tags: ["IPO", "clues", "analysis"],
    lessons: [
      {
        title: "Read for Jobs",
        body: [
          "Read the problem once for the story, then again for jobs the program must do. Action words matter.",
          "Ask, enter, prompt, or type usually means input. Calculate, convert, determine, or find usually means processing. Display, show, print, or output means output.",
          "If, otherwise, valid, invalid, range, at least, no more than, and based on a table usually mean a decision."
        ],
        keyPoints: [
          "Circle inputs.",
          "Underline outputs.",
          "Box formulas, rates, fees, and conversion factors.",
          "Star decision words."
        ],
        example: {
          title: "Clue words",
          lines: [
            "Prompt the user for gallons -> Input gallons.",
            "Convert to liters -> Set liters = gallons * 3.78541.",
            "Display the liters -> Write liters."
          ]
        },
        remember: "A word problem is not magic. It is a list of jobs hiding in sentences."
      },
      {
        title: "Find Output First",
        body: [
          "Many students start with inputs, but finding the final output first can make the whole problem clearer.",
          "Once you know the final answer, work backward. What values are needed to calculate it? Which values come from the user? Which values are fixed in the problem?",
          "For a bank balance, the final output is current balance. To get it, you need starting balance, deposits, and withdrawals."
        ],
        keyPoints: [
          "Output tells you where the program is going.",
          "Inputs are the values the program cannot invent.",
          "Processing is the bridge between input and output."
        ],
        pseudocode: [
          "1. Start",
          "2. Declare startingBalance As Float",
          "3. Declare depositAmount As Float",
          "4. Declare withdrawalAmount As Float",
          "5. Declare currentBalance As Float",
          "6. Input startingBalance",
          "7. Input depositAmount",
          "8. Input withdrawalAmount",
          "9. Set currentBalance = startingBalance + depositAmount - withdrawalAmount",
          "10. Write currentBalance",
          "11. End"
        ],
        remember: "Final output is the target. Inputs and processing are how you reach it."
      },
      {
        title: "Missing Information",
        body: [
          "Some word problems give a story but leave out a formula or conversion factor. You must know or be given the relationship before pseudocode can be exact.",
          "If the formula is known, write the formula directly. If it is not known, pause and identify what information is missing.",
          "For example, converting feet and inches to centimeters needs 12 inches per foot and 2.54 centimeters per inch."
        ],
        keyPoints: [
          "Do not hide missing math with vague words.",
          "Use a fixed value directly or give it a clear constant name.",
          "Validate the formula with a small test case."
        ],
        remember: "Clear pseudocode needs clear math."
      }
    ]
  },
  {
    id: "variables",
    title: "Variables + Types",
    icon: "braces",
    summary: "Names, declarations, constants, and beginner data types.",
    tags: ["Declare", "Integer", "Float", "String"],
    lessons: [
      {
        title: "Variables Are Labeled Boxes",
        body: [
          "A variable is a named storage location. The name lets you use the value later.",
          "The value can change while the program runs. If you set total = 10 and later set total = 25, the current value is 25.",
          "Use names that describe the value. grandTotal is clearer than g."
        ],
        keyPoints: [
          "Variables store input, calculations, and temporary values.",
          "A variable must have a value before it is used.",
          "Spelling and capitalization must stay consistent."
        ],
        python: [
          "price = 12.50",
          "quantity = 4",
          "total = price * quantity",
          "print(total)"
        ],
        remember: "A variable name is not the value. It is the label for the value."
      },
      {
        title: "Declare vs. Use",
        body: [
          "In textbook-style pseudocode, Declare creates the variable name and states the type before the variable is used.",
          "RAPTOR does not have a separate Declare symbol. It creates a variable when the variable first appears in an Input or Assignment symbol.",
          "Python also does not require Declare. A Python variable is created when you assign a value to it."
        ],
        keyPoints: [
          "Declare quantity As Integer means quantity should hold a whole number.",
          "Input quantity gives quantity a value from the user.",
          "Set total = quantity * price stores a calculated value."
        ],
        pseudocode: [
          "Declare quantity As Integer",
          "Declare price As Float",
          "Declare total As Float",
          "Input quantity",
          "Input price",
          "Set total = quantity * price"
        ],
        raptor: [
          "Input: quantity",
          "Input: price",
          "Assignment: total = quantity * price"
        ],
        remember: "Declare prepares the box. Input and Set put values in it."
      },
      {
        title: "Pick the Right Type",
        body: [
          "Integer is for whole numbers used for counting. Float is for decimals, money, rates, measurements, averages, or conversions.",
          "String is for text such as names, company names, and passwords. Character is a single text symbol such as '+'. Boolean is true or false.",
          "Do not declare literal values. You declare taxRate, not 8. You declare companyName, not 'Google'."
        ],
        keyPoints: [
          "Integer: numberOfItems, counter.",
          "Float: retailPrice, taxAmount, gallons, liters.",
          "String: companyName, firstName.",
          "Boolean: isValid, hasDiscount."
        ],
        remember: "Integer counts. Float measures. String stores words. Boolean stores yes/no."
      }
    ]
  },
  {
    id: "operators",
    title: "Operators",
    icon: "code",
    summary: "Assignment, comparison, arithmetic, modulus, and order of operations.",
    tags: ["=", "==", "%", "math"],
    lessons: [
      {
        title: "Assignment Is Not Comparison",
        body: [
          "A single equals sign in pseudocode assignment means put the right-side value into the left-side variable.",
          "A double equals sign in a condition asks whether two values are the same.",
          "The left side of assignment must be a variable. 50 = money is backward. money = 50 is the correct assignment shape."
        ],
        keyPoints: [
          "Set total = price * quantity changes total.",
          "If operator == '+' asks a question.",
          "Assignment stores. Comparison checks."
        ],
        python: [
          "money = 50",
          "if money == 50:",
          "    print('Money is exactly 50')"
        ],
        remember: "One equals stores. Two equals compares."
      },
      {
        title: "Arithmetic and Order",
        body: [
          "Programs follow the same order of operations you learned in math: parentheses first, then exponents, then multiplication/division/modulus, then addition/subtraction.",
          "The modulus operator gives a remainder. 27 % 8 gives 3 because 8 fits into 27 three times with 3 left over.",
          "Parentheses are a kindness to your future self. Use them when the calculation could be read more than one way."
        ],
        keyPoints: [
          "Use * for multiplication.",
          "Use / for division.",
          "Use % for remainder.",
          "Use parentheses to protect averages and grouped formulas."
        ],
        pseudocode: [
          "Set average = (score1 + score2) / 2",
          "Set taxAmount = totalCost * (taxRate / 100)",
          "Set remainder = 27 % 8"
        ],
        remember: "For an average, add first, then divide. Parentheses make that visible."
      },
      {
        title: "Output Spacing",
        body: [
          "Spaces around operators usually do not change the calculation, but they make code easier to read.",
          "Spaces inside quote marks do change what appears on the screen.",
          "When a sample output shows an exact layout, build that spacing into the Output or print statement."
        ],
        keyPoints: [
          "total=price*quantity works, but total = price * quantity is easier to read.",
          "'Total=$' displays no space. 'Total = $' displays spaces.",
          "Join text and values carefully."
        ],
        python: [
          "print('Total = $', total)",
          "print(str(num1) + operator + str(num2) + ' = ' + str(result))"
        ],
        remember: "Operator spaces help humans. Quote spaces affect the screen."
      }
    ]
  },
  {
    id: "pseudocode",
    title: "Pseudocode",
    icon: "file",
    summary: "Simple, numbered, English-like steps that map cleanly to RAPTOR and Python.",
    tags: ["Start", "Input", "Set", "Write"],
    lessons: [
      {
        title: "A Clean Skeleton",
        body: [
          "Pseudocode is not Python yet. It is a plan written in plain language.",
          "For class work, use short, numbered steps. Begin with Start or Main module, declare variables if your style requires it, then input, process, output, and end.",
          "Avoid vague lines such as calculate answer. Write the actual formula."
        ],
        keyPoints: [
          "Start",
          "Declare variables",
          "Write prompts",
          "Input values",
          "Set formulas",
          "Write results",
          "End"
        ],
        pseudocode: [
          "1. Start",
          "2. Declare num1 As Float",
          "3. Declare num2 As Float",
          "4. Declare average As Float",
          "5. Write \"Enter first score:\"",
          "6. Input num1",
          "7. Write \"Enter second score:\"",
          "8. Input num2",
          "9. Set average = (num1 + num2) / 2",
          "10. Write \"Average = \" + average",
          "11. End"
        ],
        remember: "A good pseudocode line is short, specific, and testable."
      },
      {
        title: "Modules and Comments",
        body: [
          "A module is a named section of a larger program. You may see Main module, Input Data module, Perform Calculations module, and Output Results module.",
          "Comments are notes for humans. They explain purpose, input, processing, or output. They are not displayed to the user.",
          "In RAPTOR, comments are added by right-clicking a symbol. Output symbols are for messages the program user sees."
        ],
        keyPoints: [
          "Call a module when you split the program into named jobs.",
          "Use comments to explain logic.",
          "Do not confuse comments with output."
        ],
        pseudocode: [
          "Main module",
          "   Call InputData module",
          "   Call CalculateTotal module",
          "   Call DisplayResults module",
          "End Program"
        ],
        remember: "A module is a smaller job. A comment is a note. Output is visible to the user."
      },
      {
        title: "Trace Before Coding",
        body: [
          "Tracing means following the pseudocode line by line and writing down variable values after each step.",
          "Use easy numbers first. If the answer should be obvious by hand, it is easier to find mistakes.",
          "Trace assignments carefully because a variable can be overwritten."
        ],
        keyPoints: [
          "Track each Set line.",
          "Only Write lines display output.",
          "Input lines pause and store a value."
        ],
        example: {
          title: "Trace",
          lines: [
            "Set a = 12.8 -> a is 12.8.",
            "Set a = 15.0 -> a is now 15.0.",
            "Set b = 2 -> b is 2.",
            "Set c = a + a + b -> c is 32.0.",
            "Write c -> screen shows 32.0."
          ]
        },
        remember: "The current value is whatever the last assignment made it."
      }
    ]
  },
  {
    id: "python-basics",
    title: "Python Basics",
    icon: "code",
    summary: "Print, input, conversion, variables, and beginner expression code.",
    tags: ["print", "input", "float", "int"],
    lessons: [
      {
        title: "Output with print",
        body: [
          "The print function displays output on the screen.",
          "Text goes inside quote marks. A variable name does not go inside quotes if you want its value.",
          "You can print several items by separating them with commas."
        ],
        keyPoints: [
          "print('Hello') displays Hello.",
          "print(total) displays the value stored in total.",
          "print('Total = $', total) displays a label and a value."
        ],
        python: [
          "room = 503",
          "print('I am staying in room number')",
          "print(room)",
          "print('Room:', room)"
        ],
        remember: "Quoted text prints exactly as text. Unquoted variables print their values."
      },
      {
        title: "Input and Conversion",
        body: [
          "Python input() collects text from the keyboard. If you need math, convert it with int() or float().",
          "Use int() for whole-number counts and float() for decimals, money, rates, and measurements.",
          "The prompt can go inside input(), so the user sees what to type."
        ],
        keyPoints: [
          "name = input('Enter name: ') stores text.",
          "quantity = int(input('Enter quantity: ')) stores a whole number.",
          "price = float(input('Enter price: ')) stores a decimal-capable number."
        ],
        python: [
          "gallons = float(input('Enter gallons: '))",
          "liters = gallons * 3.78541",
          "print('Liters =', liters)"
        ],
        remember: "input() gives you a string first. Convert before doing math."
      },
      {
        title: "Python Calculation Shape",
        body: [
          "A Python assignment statement has the same core idea as pseudocode Set: variable = expression.",
          "Python does not use Declare lines. It creates the variable when assignment runs.",
          "Good variable names are lowercase with underscores in common Python style, such as grand_total."
        ],
        keyPoints: [
          "Use = for assignment.",
          "Use clear variable names.",
          "Use comments with # when a line needs human explanation."
        ],
        python: [
          "# Calculate gross pay",
          "hours_worked = float(input('Hours worked: '))",
          "pay_rate = float(input('Pay rate: '))",
          "gross_pay = hours_worked * pay_rate",
          "print('Gross pay =', gross_pay)"
        ],
        remember: "Python syntax is stricter than pseudocode, but the logic should already be solved."
      }
    ]
  },
  {
    id: "decisions",
    title: "Decisions",
    icon: "decision",
    summary: "Selection structures, relational operators, logical operators, and validation.",
    tags: ["if", "else", "AND", "OR"],
    lessons: [
      {
        title: "Single and Dual Alternatives",
        body: [
          "A selection structure lets the program choose a path.",
          "Single-alternative If does something only when a condition is true. Dual-alternative If/Else does one thing when true and another when false.",
          "In RAPTOR, a Selection symbol creates Yes and No branches. In Python, indentation shows which statements belong to each branch."
        ],
        keyPoints: [
          "If quantity <= 0 Then error.",
          "Else continue with calculations.",
          "End If closes the decision in pseudocode."
        ],
        pseudocode: [
          "If quantity <= 0 Then",
          "   Write \"ERROR - invalid quantity\"",
          "Else",
          "   Set total = quantity * price",
          "   Write total",
          "End If"
        ],
        python: [
          "if quantity <= 0:",
          "    print('ERROR - invalid quantity')",
          "else:",
          "    total = quantity * price",
          "    print(total)"
        ],
        remember: "Read the condition as a yes/no question, then put the right steps on the right branch."
      },
      {
        title: "Relational and Logical Operators",
        body: [
          "Relational operators compare values: <, <=, >, >=, ==, and !=.",
          "AND means both parts must be true. OR means at least one part must be true. NOT flips true to false or false to true.",
          "Parentheses can make mixed AND/OR logic easier to understand."
        ],
        keyPoints: [
          "Valid range: num >= 0 AND num <= 500.",
          "Invalid range: num < 0 OR num > 500.",
          "Invalid operator: operator != '+' AND operator != '-' AND operator != '*' AND operator != '/'."
        ],
        python: [
          "if num1 < 0 or num1 > 500:",
          "    print('Number is outside the range')",
          "",
          "if operator == '+' or operator == '-':",
          "    print('Operator is allowed')"
        ],
        remember: "Use OR when any bad case should trigger an error."
      },
      {
        title: "Table and Range Decisions",
        body: [
          "A rate table usually becomes a chain of decisions. Each row becomes one condition.",
          "Choose one direction and stay consistent. You can start with the smallest range and move upward or start with the largest and move downward.",
          "Make sure one branch cannot accidentally overwrite a rate chosen by an earlier branch."
        ],
        keyPoints: [
          "1 to 9 items -> 0 percent.",
          "10 to 19 -> 10 percent.",
          "20 to 39 -> 15 percent.",
          "40 to 79 -> 20 percent.",
          "80 to 99 -> 25 percent.",
          "100 or more -> 30 percent."
        ],
        pseudocode: [
          "If quantity <= 9 Then",
          "   Set discountRate = 0",
          "Else If quantity <= 19 Then",
          "   Set discountRate = 0.10",
          "Else If quantity <= 39 Then",
          "   Set discountRate = 0.15",
          "Else If quantity <= 79 Then",
          "   Set discountRate = 0.20",
          "Else If quantity <= 99 Then",
          "   Set discountRate = 0.25",
          "Else",
          "   Set discountRate = 0.30",
          "End If"
        ],
        remember: "A table is a decision chain wearing a nicer outfit."
      }
    ]
  },
  {
    id: "loops",
    title: "Loops",
    icon: "loop",
    summary: "Repeat steps safely with while loops, for loops, counters, and sentinels.",
    tags: ["while", "for", "counter"],
    lessons: [
      {
        title: "Why Loops Exist",
        body: [
          "A loop repeats a block of steps. It is useful when the same job must happen more than once.",
          "A while loop repeats while a condition is true. A for loop is often used when you know how many times to repeat.",
          "Every loop needs a way to stop. If nothing changes the condition, the loop may repeat forever."
        ],
        keyPoints: [
          "Use while for validation and unknown repetition.",
          "Use for for counted repetition.",
          "Update counters or inputs inside the loop."
        ],
        python: [
          "count = 1",
          "while count <= 5:",
          "    print(count)",
          "    count = count + 1"
        ],
        remember: "A loop condition must eventually become false."
      },
      {
        title: "Counters and Running Totals",
        body: [
          "A counter tracks how many times something has happened. A running total adds values over time.",
          "Initialize them before the loop. Update them inside the loop.",
          "For five test scores, count can control how many scores are read while total adds them."
        ],
        pseudocode: [
          "Set total = 0",
          "Set count = 1",
          "While count <= 5",
          "   Input score",
          "   Set total = total + score",
          "   Set count = count + 1",
          "End While",
          "Set average = total / 5",
          "Write average"
        ],
        python: [
          "total = 0",
          "for count in range(5):",
          "    score = float(input('Score: '))",
          "    total = total + score",
          "average = total / 5",
          "print('Average =', average)"
        ],
        remember: "Initialize before, update inside, use after."
      },
      {
        title: "Sentinels and Validation Loops",
        body: [
          "A sentinel is a special value that means stop. For example, enter -1 when there are no more scores.",
          "A validation loop keeps asking until the input is acceptable.",
          "Use validation when the problem says the value must be within a range or cannot be zero."
        ],
        python: [
          "number = int(input('Enter 1 through 10: '))",
          "while number < 1 or number > 10:",
          "    print('Invalid number')",
          "    number = int(input('Enter 1 through 10: '))"
        ],
        remember: "Validation loops guard the rest of the program from bad data."
      }
    ]
  },
  {
    id: "functions",
    title: "Functions",
    icon: "flow",
    summary: "Split programs into named pieces that can receive values and return results.",
    tags: ["module", "def", "return"],
    lessons: [
      {
        title: "Functions Are Named Jobs",
        body: [
          "A function groups statements under one name. Calling the function runs those statements.",
          "Functions make larger programs easier to read because each part has one clear job.",
          "In pseudocode, you may see modules. In Python, you write functions with def."
        ],
        python: [
          "def show_heading():",
          "    print('Shipping Calculator')",
          "",
          "show_heading()"
        ],
        remember: "A function name should sound like the job it performs."
      },
      {
        title: "Arguments and Return Values",
        body: [
          "An argument is a value you send into a function. A return value is the answer the function sends back.",
          "Use return when a function calculates a value that the rest of the program needs.",
          "Avoid relying on hidden global values when passing the needed values would be clearer."
        ],
        python: [
          "def calculate_total(price, quantity):",
          "    return price * quantity",
          "",
          "total = calculate_total(12.50, 4)",
          "print(total)"
        ],
        remember: "Arguments go in. Return values come out."
      },
      {
        title: "Top-Down Design",
        body: [
          "Top-down design starts with the big job, then splits it into smaller jobs.",
          "For a shipping program, the big jobs might be input data, choose discount rate, calculate totals, and display results.",
          "This matches RAPTOR subcharts and Python functions well."
        ],
        pseudocode: [
          "Main module",
          "   Call getInput",
          "   Call chooseDiscountRate",
          "   Call calculateTotals",
          "   Call displayResults",
          "End Program"
        ],
        remember: "If a program feels long, look for smaller jobs with names."
      }
    ]
  },
  {
    id: "collections",
    title: "Lists + Strings",
    icon: "list",
    summary: "Later Python tools for many values and text processing.",
    tags: ["lists", "tuples", "strings"],
    lessons: [
      {
        title: "Lists Hold Many Values",
        body: [
          "A list is a sequence of values stored under one name.",
          "Lists are useful when you have many related values, such as scores, prices, or names.",
          "Python list indexes start at 0, so the first item is listName[0]."
        ],
        python: [
          "scores = [82, 91, 77]",
          "total = sum(scores)",
          "average = total / len(scores)",
          "print(average)"
        ],
        remember: "A list is one variable name for many positions."
      },
      {
        title: "Strings Are Sequences Too",
        body: [
          "A string stores text. Python can inspect characters, slice pieces, change case, and search for text.",
          "String values stay in quotes. If a number is inside quotes, it is text until converted.",
          "Use string methods when you need to clean or compare user input."
        ],
        python: [
          "operator = input('Operator: ')",
          "operator = operator.strip()",
          "if operator == '+':",
          "    print('Add')"
        ],
        remember: "Text that looks like a number is still text until you convert it."
      },
      {
        title: "When Not to Use a List Yet",
        body: [
          "Early assignments often expect only variables, selections, and simple formulas.",
          "If the course has not introduced lists, do not use a list just because it would be shorter.",
          "Follow the covered material. A longer beginner solution can be the correct solution for that week."
        ],
        remember: "Use the tool the assignment is practicing."
      }
    ]
  },
  {
    id: "files",
    title: "Files + Errors",
    icon: "file",
    summary: "A preview of reading, writing, and handling problems in Python.",
    tags: ["files", "exceptions", "records"],
    lessons: [
      {
        title: "Sequential Files",
        body: [
          "A sequential file stores data one piece after another. Programs can read from files or write to files.",
          "File processing is useful when data should survive after the program ends.",
          "Always close files or use a with statement so Python handles closing for you."
        ],
        python: [
          "with open('notes.txt', 'w') as file:",
          "    file.write('Python practice\\n')"
        ],
        remember: "Variables disappear when the program ends. Files can persist."
      },
      {
        title: "Exceptions",
        body: [
          "An exception is an error that happens while the program is running.",
          "For example, converting 'hello' with int() causes a ValueError because the text is not a valid integer.",
          "Python can catch exceptions with try and except, but use this only when your course has reached it."
        ],
        python: [
          "try:",
          "    quantity = int(input('Quantity: '))",
          "except ValueError:",
          "    print('Please enter a whole number')"
        ],
        remember: "Validation prevents bad input. Exceptions handle runtime problems."
      },
      {
        title: "Records and Fields",
        body: [
          "A field is one piece of data, such as name or price. A record is a group of related fields.",
          "A file can hold many records, such as many products or many customers.",
          "This idea becomes important when programs move beyond single-screen calculations."
        ],
        remember: "Field is one value. Record is a related group of values."
      }
    ]
  },
  {
    id: "raptor",
    title: "RAPTOR",
    icon: "raptor",
    summary: "Translate pseudocode into flowchart symbols and common RAPTOR rules.",
    tags: ["symbols", "flowchart", "comments"],
    lessons: [
      {
        title: "Six Core Symbols",
        body: [
          "RAPTOR turns logic into a flowchart. Each symbol has a job.",
          "Start and End mark the program boundaries. Input receives user values. Output displays text or values. Assignment stores calculations. Selection branches. Loop repeats.",
          "Call is used for subcharts or modules when a program is split into named sections."
        ],
        keyPoints: [
          "Output prompt -> Input variable.",
          "Set formula -> Assignment symbol.",
          "If condition -> Selection symbol.",
          "While/For idea -> Loop symbol.",
          "Call module -> Call symbol."
        ],
        remember: "Pseudocode line type tells you the RAPTOR symbol."
      },
      {
        title: "Build Order",
        body: [
          "Start with required heading comments. Then add prompts, inputs, validation selections, assignments, decision rules, and final outputs.",
          "If bad input should stop the program, connect the invalid branch to an error Output and then to End.",
          "Test every branch. A discount table with six ranges needs test values that touch different ranges."
        ],
        raptor: [
          "Start",
          "Comment heading",
          "Output prompt",
          "Input variable",
          "Selection for validation",
          "Assignment formulas",
          "Output final results",
          "End"
        ],
        remember: "Build the chart in the same order as the pseudocode."
      },
      {
        title: "Common RAPTOR Errors",
        body: [
          "Variable not found usually means the variable was used before an Input or Assignment created it, or the name was misspelled.",
          "Cannot assign string to numeric variable means the variable started as one type and later received a different type.",
          "Wrong branch behavior usually means the condition was phrased one way but the Yes/No steps were placed as if it meant the opposite."
        ],
        keyPoints: [
          "Create variables before using them.",
          "Keep number variables numeric and string variables text.",
          "Read every diamond as a yes/no question."
        ],
        remember: "Most RAPTOR bugs are order, spelling, type, or branch bugs."
      }
    ]
  },
  {
    id: "practice-patterns",
    title: "Practice Patterns",
    icon: "cards",
    summary: "Common lab and homework-style structures without copying the original prompts.",
    tags: ["conversion", "recipe", "calculator"],
    lessons: [
      {
        title: "Conversion Problems",
        body: [
          "A conversion problem gives an input unit, a conversion factor, and an output unit.",
          "The processing is usually one formula. Name the input and output clearly.",
          "Gallons to liters uses liters = gallons * 3.78541."
        ],
        pseudocode: [
          "1. Start",
          "2. Declare gallons As Float",
          "3. Declare liters As Float",
          "4. Write \"Enter gallons:\"",
          "5. Input gallons",
          "6. Set liters = gallons * 3.78541",
          "7. Write \"Liters = \" + liters",
          "8. End"
        ],
        remember: "Input unit times conversion factor equals output unit."
      },
      {
        title: "Scaling Problems",
        body: [
          "A recipe or scaling problem starts with an original amount and asks for a different amount.",
          "Find the scale factor first: desired amount / original amount.",
          "Multiply each original ingredient by that scale factor."
        ],
        pseudocode: [
          "Set scaleFactor = desiredDonuts / 20",
          "Set sugarCups = scaleFactor * 2.5",
          "Set butterCups = scaleFactor * 5",
          "Set flourCups = scaleFactor * 1.8",
          "Set saltCups = scaleFactor * 1"
        ],
        remember: "Desired divided by original gives the multiplier."
      },
      {
        title: "Guarded Calculator",
        body: [
          "A calculator problem combines validation, operator decisions, and one special division rule.",
          "First validate the numbers. Then validate the operator. Then handle each operator. For division, check the denominator before dividing.",
          "Use quotes around operator comparisons because +, -, *, and / are characters."
        ],
        pseudocode: [
          "If num1 < 0 OR num1 > 500 OR num2 < 0 OR num2 > 500 Then",
          "   Write \"ERROR\"",
          "Else",
          "   Input operator",
          "   If operator == \"+\" Then",
          "      Set result = num1 + num2",
          "   Else If operator == \"/\" Then",
          "      If num2 == 0 Then",
          "         Write \"Cannot divide by zero\"",
          "      Else",
          "         Set result = num1 / num2",
          "      End If",
          "   End If",
          "End If"
        ],
        remember: "Validate before calculate. Protect division by zero before dividing."
      }
    ]
  }
];

const scenarios = [
  {
    id: "average-two",
    title: "Average Two Scores",
    brief: "Ask for two test scores, calculate the average, and display it.",
    clues: ["ask for two scores", "calculate average", "display average"],
    ipo: {
      input: ["score1", "score2"],
      processing: ["total = score1 + score2", "average = total / 2"],
      output: ["average"],
      decisions: ["none"]
    },
    pseudocode: [
      "1. Start",
      "2. Declare score1 As Float",
      "3. Declare score2 As Float",
      "4. Declare total As Float",
      "5. Declare average As Float",
      "6. Write \"Enter first score:\"",
      "7. Input score1",
      "8. Write \"Enter second score:\"",
      "9. Input score2",
      "10. Set total = score1 + score2",
      "11. Set average = total / 2",
      "12. Write \"Average = \" + average",
      "13. End"
    ],
    raptor: [
      ["start", "Start"],
      ["output", "Prompt for first score"],
      ["input", "Input score1"],
      ["output", "Prompt for second score"],
      ["input", "Input score2"],
      ["assignment", "total = score1 + score2"],
      ["assignment", "average = total / 2"],
      ["output", "Display average"],
      ["end", "End"]
    ],
    python: [
      "score1 = float(input('Enter first score: '))",
      "score2 = float(input('Enter second score: '))",
      "total = score1 + score2",
      "average = total / 2",
      "print('Average =', average)"
    ]
  },
  {
    id: "gallons-liters",
    title: "Gallons to Liters",
    brief: "Ask for a US gallon amount, convert it to liters, and display the result.",
    clues: ["volume in gallons", "conversion factor 3.78541", "display liters"],
    ipo: {
      input: ["gallons"],
      processing: ["liters = gallons * 3.78541"],
      output: ["liters"],
      decisions: ["none unless the assignment asks for validation"]
    },
    pseudocode: [
      "1. Start",
      "2. Declare gallons As Float",
      "3. Declare liters As Float",
      "4. Write \"Enter gallons:\"",
      "5. Input gallons",
      "6. Set liters = gallons * 3.78541",
      "7. Write \"Liters = \" + liters",
      "8. End"
    ],
    raptor: [
      ["start", "Start"],
      ["output", "Prompt for gallons"],
      ["input", "Input gallons"],
      ["assignment", "liters = gallons * 3.78541"],
      ["output", "Display liters"],
      ["end", "End"]
    ],
    python: [
      "gallons = float(input('Enter gallons: '))",
      "liters = gallons * 3.78541",
      "print('Liters =', liters)"
    ]
  },
  {
    id: "donut-scale",
    title: "Recipe Scaling",
    brief: "Ask how many items to make, scale each ingredient from the original recipe, and display the ingredient amounts.",
    clues: ["original recipe makes 20", "desired amount from user", "ingredient amounts scale together"],
    ipo: {
      input: ["desiredDonuts"],
      processing: ["scaleFactor = desiredDonuts / 20", "each ingredient = scaleFactor * original ingredient"],
      output: ["sugarCups", "butterCups", "flourCups", "saltCups"],
      decisions: ["optional validation if desiredDonuts <= 0"]
    },
    pseudocode: [
      "1. Start",
      "2. Declare desiredDonuts As Integer",
      "3. Declare scaleFactor As Float",
      "4. Declare sugarCups As Float",
      "5. Declare butterCups As Float",
      "6. Declare flourCups As Float",
      "7. Declare saltCups As Float",
      "8. Write \"Enter number of donuts:\"",
      "9. Input desiredDonuts",
      "10. Set scaleFactor = desiredDonuts / 20",
      "11. Set sugarCups = scaleFactor * 2.5",
      "12. Set butterCups = scaleFactor * 5",
      "13. Set flourCups = scaleFactor * 1.8",
      "14. Set saltCups = scaleFactor * 1",
      "15. Write sugarCups, butterCups, flourCups, saltCups",
      "16. End"
    ],
    raptor: [
      ["start", "Start"],
      ["output", "Prompt for desired amount"],
      ["input", "Input desiredDonuts"],
      ["assignment", "scaleFactor = desiredDonuts / 20"],
      ["assignment", "sugarCups = scaleFactor * 2.5"],
      ["assignment", "butterCups = scaleFactor * 5"],
      ["assignment", "flourCups = scaleFactor * 1.8"],
      ["assignment", "saltCups = scaleFactor * 1"],
      ["output", "Display ingredient amounts"],
      ["end", "End"]
    ],
    python: [
      "desired_donuts = int(input('Enter number of donuts: '))",
      "scale_factor = desired_donuts / 20",
      "sugar_cups = scale_factor * 2.5",
      "butter_cups = scale_factor * 5",
      "flour_cups = scale_factor * 1.8",
      "salt_cups = scale_factor * 1",
      "print('Sugar cups =', sugar_cups)",
      "print('Butter cups =', butter_cups)",
      "print('Flour cups =', flour_cups)",
      "print('Salt cups =', salt_cups)"
    ]
  },
  {
    id: "coins",
    title: "Coin Value",
    brief: "Ask for counts of quarters, dimes, and nickels. Display total value in pennies.",
    clues: ["three coin counts", "quarter = 25 pennies", "dime = 10 pennies", "nickel = 5 pennies"],
    ipo: {
      input: ["quarters", "dimes", "nickels"],
      processing: ["totalPennies = quarters * 25 + dimes * 10 + nickels * 5"],
      output: ["totalPennies"],
      decisions: ["optional validation for negative counts"]
    },
    pseudocode: [
      "1. Start",
      "2. Declare quarters As Integer",
      "3. Declare dimes As Integer",
      "4. Declare nickels As Integer",
      "5. Declare totalPennies As Integer",
      "6. Input quarters",
      "7. Input dimes",
      "8. Input nickels",
      "9. Set totalPennies = quarters * 25 + dimes * 10 + nickels * 5",
      "10. Write \"Total pennies = \" + totalPennies",
      "11. End"
    ],
    raptor: [
      ["start", "Start"],
      ["input", "Input quarters"],
      ["input", "Input dimes"],
      ["input", "Input nickels"],
      ["assignment", "totalPennies = quarters * 25 + dimes * 10 + nickels * 5"],
      ["output", "Display totalPennies"],
      ["end", "End"]
    ],
    python: [
      "quarters = int(input('Quarters: '))",
      "dimes = int(input('Dimes: '))",
      "nickels = int(input('Nickels: '))",
      "total_pennies = quarters * 25 + dimes * 10 + nickels * 5",
      "print('Total pennies =', total_pennies)"
    ]
  },
  {
    id: "shipping",
    title: "Shipping Discount",
    brief: "Use quantity, item price, tax rate, discount ranges, and shipping rules to calculate a grand total.",
    clues: ["company name", "quantity must be positive", "tax is before discount", "shipping free at 50 or more", "discount table"],
    ipo: {
      input: ["companyName", "quantity", "retailPrice", "taxRate"],
      processing: ["total = quantity * retailPrice", "tax = total * (taxRate / 100)", "discount = total * discountRate", "shipping = 0 or 35", "grandTotal = total - discount + tax + shipping"],
      output: ["all inputs", "total", "discount", "tax", "shipping", "grandTotal"],
      decisions: ["quantity <= 0 error", "discount range", "shipping fee rule"]
    },
    pseudocode: [
      "1. Start",
      "2. Input companyName",
      "3. Input quantity",
      "4. If quantity <= 0 Then",
      "5.    Write \"ERROR - invalid quantity\"",
      "6. Else",
      "7.    Input retailPrice",
      "8.    Input taxRate",
      "9.    Set total = quantity * retailPrice",
      "10.   If quantity <= 9 Then Set discountRate = 0",
      "11.   Else If quantity <= 19 Then Set discountRate = 0.10",
      "12.   Else If quantity <= 39 Then Set discountRate = 0.15",
      "13.   Else If quantity <= 79 Then Set discountRate = 0.20",
      "14.   Else If quantity <= 99 Then Set discountRate = 0.25",
      "15.   Else Set discountRate = 0.30",
      "16.   Set discount = total * discountRate",
      "17.   Set tax = total * (taxRate / 100)",
      "18.   If quantity >= 50 Then Set shipping = 0 Else Set shipping = 35",
      "19.   Set grandTotal = total - discount + tax + shipping",
      "20.   Write companyName, quantity, total, discount, tax, shipping, grandTotal",
      "21. End If",
      "22. End"
    ],
    raptor: [
      ["start", "Start"],
      ["input", "Input companyName"],
      ["input", "Input quantity"],
      ["selection", "quantity <= 0?"],
      ["output", "Yes branch: display error"],
      ["input", "No branch: input retailPrice and taxRate"],
      ["assignment", "total = quantity * retailPrice"],
      ["selection", "Choose discount range"],
      ["assignment", "discount = total * discountRate"],
      ["assignment", "tax = total * (taxRate / 100)"],
      ["selection", "quantity >= 50?"],
      ["assignment", "shipping = 0 or 35"],
      ["assignment", "grandTotal = total - discount + tax + shipping"],
      ["output", "Display all required values"],
      ["end", "End"]
    ],
    python: [
      "company_name = input('Company name: ')",
      "quantity = int(input('Quantity: '))",
      "if quantity <= 0:",
      "    print('ERROR - invalid quantity')",
      "else:",
      "    retail_price = float(input('Retail price: '))",
      "    tax_rate = float(input('Tax rate as whole number: '))",
      "    total = quantity * retail_price",
      "    if quantity <= 9:",
      "        discount_rate = 0",
      "    elif quantity <= 19:",
      "        discount_rate = 0.10",
      "    elif quantity <= 39:",
      "        discount_rate = 0.15",
      "    elif quantity <= 79:",
      "        discount_rate = 0.20",
      "    elif quantity <= 99:",
      "        discount_rate = 0.25",
      "    else:",
      "        discount_rate = 0.30",
      "    discount = total * discount_rate",
      "    tax = total * (tax_rate / 100)",
      "    shipping = 0 if quantity >= 50 else 35",
      "    grand_total = total - discount + tax + shipping",
      "    print(company_name, grand_total)"
    ]
  },
  {
    id: "calculator",
    title: "Guarded Calculator",
    brief: "Ask for two numbers in range and an operator. Display the result or an error.",
    clues: ["numbers must be 0 to 500", "operator must be +, -, *, or /", "division by zero is not allowed"],
    ipo: {
      input: ["num1", "num2", "operator"],
      processing: ["result depends on operator"],
      output: ["expression and result or error message"],
      decisions: ["number range", "operator validity", "division by zero"]
    },
    pseudocode: [
      "1. Start",
      "2. Input num1",
      "3. Input num2",
      "4. If num1 < 0 OR num1 > 500 OR num2 < 0 OR num2 > 500 Then",
      "5.    Write \"ERROR - number outside range\"",
      "6. Else",
      "7.    Input operator",
      "8.    If operator == \"+\" Then Set result = num1 + num2",
      "9.    Else If operator == \"-\" Then Set result = num1 - num2",
      "10.   Else If operator == \"*\" Then Set result = num1 * num2",
      "11.   Else If operator == \"/\" Then",
      "12.      If num2 == 0 Then Write \"Cannot divide by zero\"",
      "13.      Else Set result = num1 / num2",
      "14.   Else Write \"ERROR - invalid operator\"",
      "15.   Write num1 + operator + num2 + \" = \" + result",
      "16. End If",
      "17. End"
    ],
    raptor: [
      ["start", "Start"],
      ["input", "Input num1"],
      ["input", "Input num2"],
      ["selection", "Any number outside 0 to 500?"],
      ["output", "Invalid branch: display range error"],
      ["input", "Valid branch: input operator"],
      ["selection", "operator == '+'?"],
      ["assignment", "result = num1 + num2"],
      ["selection", "operator == '-'?"],
      ["assignment", "result = num1 - num2"],
      ["selection", "operator == '*'?"],
      ["assignment", "result = num1 * num2"],
      ["selection", "operator == '/'?"],
      ["selection", "num2 == 0?"],
      ["output", "Display divide-by-zero error or result"],
      ["end", "End"]
    ],
    python: [
      "num1 = float(input('Num1: '))",
      "num2 = float(input('Num2: '))",
      "if num1 < 0 or num1 > 500 or num2 < 0 or num2 > 500:",
      "    print('ERROR - number outside range')",
      "else:",
      "    operator = input('Operator: ')",
      "    if operator == '+':",
      "        result = num1 + num2",
      "        print(num1, '+', num2, '=', result)",
      "    elif operator == '/' and num2 == 0:",
      "        print('Invalid operation - cannot divide by 0')"
    ]
  }
];

const glossary = [
  ["Algorithm", "A step-by-step recipe for solving a problem in a finite number of steps."],
  ["Pseudocode", "A plain-language plan for program logic. It is not meant to run by itself."],
  ["IPO", "Input, Processing, Output. The simplest way to sort a word problem."],
  ["Variable", "A named storage place for a value that may change while the program runs."],
  ["Declare", "A pseudocode statement that introduces a variable and its data type."],
  ["Integer", "A whole number type, useful for counts."],
  ["Float", "A decimal-capable number type, useful for money, measurements, and rates."],
  ["String", "Text data, such as names or messages."],
  ["Boolean", "A true or false value."],
  ["Assignment", "Putting a value into a variable, usually with variable = expression."],
  ["Expression", "A value or calculation that produces a value."],
  ["Relational operator", "An operator such as <, <=, >, >=, ==, or != that compares values."],
  ["Logical operator", "AND, OR, or NOT. Used to combine or reverse Boolean conditions."],
  ["Selection", "A decision structure that chooses a path based on a true/false condition."],
  ["Loop", "A structure that repeats steps while a condition is true or for a known count."],
  ["Counter", "A variable that counts repetitions."],
  ["Accumulator", "A variable that keeps a running total."],
  ["Sentinel", "A special value that tells a loop to stop."],
  ["Function", "A named group of statements that can be called."],
  ["Argument", "A value passed into a function."],
  ["Return value", "A value sent back from a function."],
  ["RAPTOR Input", "A flowchart symbol that receives a value from the user."],
  ["RAPTOR Output", "A flowchart symbol that displays text or values."],
  ["RAPTOR Assignment", "A flowchart symbol that calculates or stores a value."],
  ["RAPTOR Selection", "A diamond that asks a yes/no question and branches."],
  ["Comment", "A note for humans that the program user does not see."],
  ["Validation", "Checking input before using it in calculations."],
  ["Trace", "Following code or pseudocode line by line to track values."],
  ["Syntax", "The exact grammar rules of a programming language."],
  ["Runtime error", "An error that happens while a program is running."]
];

const flashcards = [
  ["Write asks or shows. Input receives. Set calculates. Declare prepares.", "What is the quick memory trick for basic pseudocode words?"],
  ["Use Input or an input symbol.", "The problem says the user enters a value. What kind of step is that?"],
  ["Use Assignment in RAPTOR and Set in pseudocode.", "The problem says calculate total = price * quantity. What step is that?"],
  ["Use Output in RAPTOR and Write in pseudocode.", "The problem says display the result. What step is that?"],
  ["A Selection diamond.", "Which RAPTOR symbol matches If/Else?"],
  ["No. That tries to assign into a literal value.", "Is 50 = money a valid assignment?"],
  ["Use == in conditions.", "What operator should compare two values for equality?"],
  ["Use OR.", "Which logical operator catches any invalid case?"],
  ["Convert it with int() or float().", "Python input() gives text. What do you do before math?"],
  ["It was used before it had a value or the name is misspelled.", "What does a RAPTOR variable-not-found error usually mean?"],
  ["Tax is calculated on the total before discount, when that is what the prompt says.", "In the shipping pattern, when is tax calculated?"],
  ["Check num2 == 0 before dividing.", "How do you protect division by zero?"]
];

const questionBank = [
  q("variables", "Which variable type is best for cups of sugar that may include decimals?", ["Integer", "Float", "String", "Boolean"], 1, "Ingredient measurements may have decimals, so Float is the best fit."),
  q("variables", "Which line uses assignment correctly?", ["50 = money", "money = 50", "\"money\" = 50", "Set 50 = money"], 1, "The variable receiving the value goes on the left."),
  q("operators", "What is the result of 27 % 8?", ["2", "3", "4", "8"], 1, "8 fits into 27 three times with 3 left over."),
  q("operators", "Why should average = (num1 + num2) / 2 use parentheses?", ["To convert to string", "To add before dividing", "To make a loop", "To declare variables"], 1, "Without parentheses, division would happen before addition."),
  q("word-problems", "The phrase 'display the total' usually means which pseudocode action?", ["Input", "Write", "Declare", "Call"], 1, "Display, show, print, and output all point to Write."),
  q("word-problems", "The phrase 'prompt the user to enter price' usually creates what pair?", ["Write then Input", "Set then Write", "If then End", "Call then Return"], 0, "A prompt is displayed, then the value is input."),
  q("pseudocode", "Which pseudocode step is most specific?", ["Calculate total", "Do math", "Set total = price * quantity", "Find answer"], 2, "The exact formula makes the step testable."),
  q("pseudocode", "Only which pseudocode statement displays something to the user?", ["Input", "Set", "Write", "Declare"], 2, "Write/Display/Output statements show information."),
  q("computer-basics", "What does RAM do in a running program?", ["Stores temporary working data", "Permanently stores files only", "Compiles Python", "Prints output"], 0, "RAM is temporary working memory."),
  q("computer-basics", "Boolean data has which possible values?", ["Numbers only", "Text only", "True or false", "Files and records"], 2, "Boolean means true/false."),
  q("python-basics", "What does Python input() return first?", ["Integer", "Float", "String text", "Boolean"], 2, "input() reads text; convert it for math."),
  q("python-basics", "Which Python line gets a decimal-capable price?", ["price = input(float)", "price = float(input('Price: '))", "float = price(input())", "price as Float"], 1, "Wrap input() with float() for decimal numeric input."),
  q("decisions", "Which condition checks that num is outside 0 through 500?", ["num >= 0 AND num <= 500", "num < 0 OR num > 500", "num == 0 AND num == 500", "num != 0 OR num != 500"], 1, "Any value below 0 or above 500 is invalid, so OR fits."),
  q("decisions", "In RAPTOR, a Selection symbol creates which branches?", ["Input and Output", "Start and End", "Yes and No", "Read and Write"], 2, "A selection asks a true/false question and branches Yes/No."),
  q("decisions", "A discount table with several ranges is usually translated as:", ["One Input symbol only", "A chain of decisions", "Only comments", "A file write"], 1, "Each table row becomes a condition."),
  q("loops", "What must happen inside a while loop to avoid repeating forever?", ["The condition must eventually change", "All variables must be strings", "Output must be removed", "Declare must run last"], 0, "A loop needs a path to make its condition false."),
  q("loops", "A running total should usually be initialized when?", ["After display", "Before the loop", "Inside only the final branch", "Never"], 1, "Start totals at 0 before adding values in the loop."),
  q("functions", "What does a function argument do?", ["Sends a value into a function", "Deletes a variable", "Stops RAPTOR", "Creates a file"], 0, "Arguments are inputs to functions."),
  q("functions", "What does return do in a Python function?", ["Displays text", "Sends a value back", "Starts a loop", "Creates a comment"], 1, "return gives the caller a value."),
  q("raptor", "Which RAPTOR symbol matches Set total = price * quantity?", ["Input", "Output", "Assignment", "Selection"], 2, "Set statements become Assignment symbols."),
  q("raptor", "Which RAPTOR symbol is used for a user prompt message?", ["Output", "Input", "Selection", "Loop"], 0, "Prompt text is displayed, so Output is appropriate."),
  q("raptor", "A RAPTOR comment is different from Output because:", ["The user sees comments", "Comments are notes for humans and are not displayed", "Comments store numbers", "Output is only for code"], 1, "Comments document logic; Output displays to the program user."),
  q("practice-patterns", "For recipe scaling, the scale factor is usually:", ["original / desired", "desired / original", "desired + original", "original % desired"], 1, "Desired amount divided by original amount gives the multiplier."),
  q("practice-patterns", "For gallons to liters, which formula matches the provided factor?", ["liters = gallons + 3.78541", "liters = gallons / 3.78541", "liters = gallons * 3.78541", "gallons = liters * gallons"], 2, "Multiply gallons by the conversion factor."),
  q("practice-patterns", "Before dividing in a calculator, what should you check?", ["num1 == 0", "operator != '+'", "num2 == 0", "result == 0"], 2, "The denominator is num2, so check it before division."),
  q("operators", "What does total = total + price usually do?", ["Resets total to 0", "Adds price into a running total", "Compares total and price", "Displays total"], 1, "The old total is used on the right, then the new total is stored on the left."),
  q("variables", "Which is the clearest variable name for a grand total?", ["g", "x2", "grandTotal", "t"], 2, "Descriptive names make code easier to understand."),
  q("pseudocode", "What should a pseudocode End If do?", ["Close a decision block", "Start a file", "Display a result", "Convert input"], 0, "End If marks the end of the branch structure."),
  q("collections", "What index is the first item in a Python list?", ["0", "1", "-1", "10"], 0, "Python lists are zero-indexed."),
  q("files", "What does a with open(...) statement help with?", ["Closing the file properly", "Creating a RAPTOR diamond", "Changing an integer to string", "Skipping validation"], 0, "with handles setup and closing for file work.")
];

function q(topic, prompt, choices, answer, why) {
  return { topic, prompt, choices, answer, why };
}

const state = {
  view: "home",
  query: "",
  topicId: topics[0].id,
  lessonIndex: 0,
  scenarioId: scenarios[0].id,
  flashIndex: 0,
  flashBack: false,
  quizTopic: "all",
  quiz: null,
  copyNotice: ""
};

let progress = loadProgress();

function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      completed: data.completed || {},
      quizScores: data.quizScores || []
    };
  } catch {
    return { completed: {}, quizScores: [] };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.book}</svg>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function codeBlock(lines) {
  return `<pre class="code-block"><code>${escapeHtml(lines.join("\n"))}</code></pre>`;
}

function list(items) {
  if (!items || !items.length) return "";
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function completedKey(topicId, lessonIndex) {
  return `${topicId}:${lessonIndex}`;
}

function isLessonDone(topicId, lessonIndex) {
  return Boolean(progress.completed[completedKey(topicId, lessonIndex)]);
}

function totalLessons() {
  return topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
}

function completedLessons() {
  return Object.keys(progress.completed).length;
}

function topicProgress(topic) {
  const done = topic.lessons.filter((_, index) => isLessonDone(topic.id, index)).length;
  return Math.round((done / topic.lessons.length) * 100);
}

function bestQuizScore() {
  if (!progress.quizScores.length) return 0;
  return Math.max(...progress.quizScores.map((score) => score.percent || 0));
}

function render() {
  app.innerHTML = `
    <main class="screen">
      ${renderTopbar()}
      ${renderView()}
    </main>
  `;
}

function renderTopbar() {
  const nav = [
    ["home", "Dashboard", "home"],
    ["lessons", "Lessons", "book"],
    ["practice", "Practice", "cards"],
    ["raptor", "RAPTOR", "raptor"],
    ["glossary", "Glossary", "search"]
  ];
  return `
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark">${icon("code")}</div>
        <div>
          <h1>BringItOnPython</h1>
          <p>Python, pseudocode, word problems, and RAPTOR</p>
        </div>
      </div>
      <nav class="nav" aria-label="Primary">
        ${nav.map(([view, label, iconName]) => `
          <button class="nav-button ${state.view === view ? "active" : ""}" data-nav="${view}" title="${label}">
            ${icon(iconName)}<span>${label}</span>
          </button>
        `).join("")}
      </nav>
    </header>
  `;
}

function renderView() {
  if (state.view === "lessons") return renderLessons();
  if (state.view === "practice") return renderPractice();
  if (state.view === "raptor") return renderRaptor();
  if (state.view === "glossary") return renderGlossary();
  return renderHome();
}

function renderHome() {
  const done = completedLessons();
  const total = totalLessons();
  return `
    <section class="section-head">
      <div>
        <h2>Build the plan before the code.</h2>
        <p>Study the same idea in four forms: English problem, pseudocode, RAPTOR flowchart, and Python.</p>
      </div>
      <button class="action-button" data-nav="lessons">${icon("book")}Start Lessons</button>
    </section>

    <section class="stats-grid" aria-label="Progress stats">
      <div class="stat-tile"><span>Lessons done</span><strong>${done}/${total}</strong></div>
      <div class="stat-tile"><span>Completion</span><strong>${Math.round((done / total) * 100)}%</strong></div>
      <div class="stat-tile"><span>Best quiz</span><strong>${bestQuizScore()}%</strong></div>
      <div class="stat-tile"><span>Transforms</span><strong>${scenarios.length}</strong></div>
    </section>

    <section class="dash-layout">
      <div class="panel">
        <h3>Learning Route</h3>
        <div class="path-list">
          ${[
            ["Read", "Find what the problem gives you and what it wants back."],
            ["Sort", "Make the Input, Processing, Output list before writing steps."],
            ["Plan", "Write simple pseudocode with Declare, Input, Set, Write, If, and End If."],
            ["Build", "Map each pseudocode line to a RAPTOR symbol, then translate the logic to Python."]
          ].map(([title, text], index) => `
            <div class="path-item">
              <div class="path-number">${index + 1}</div>
              <div><strong>${title}</strong><p>${text}</p></div>
            </div>
          `).join("")}
        </div>
      </div>
      <aside class="panel">
        <h3>Continue</h3>
        ${renderContinueCard()}
      </aside>
    </section>

    <section class="section-head" style="margin-top: 18px;">
      <div>
        <h2>Topic Deck</h2>
        <p>Each topic keeps the reading short, direct, and practice-ready.</p>
      </div>
    </section>
    <section class="topic-grid">
      ${topics.slice(0, 6).map(renderTopicCard).join("")}
    </section>
  `;
}

function renderContinueCard() {
  const next = findNextLesson();
  if (!next) {
    return `
      <p>All lessons are marked complete. Nice, tidy finish.</p>
      <button class="ghost-button" data-reset-progress>${icon("reset")}Reset Progress</button>
    `;
  }
  return `
    <div class="mini-card" style="margin-top: 12px;">
      <div class="mini-icon" style="--accent:${next.color};">${icon(next.topic.icon)}</div>
      <h3 style="margin-top: 12px;">${escapeHtml(next.topic.title)}</h3>
      <p>${escapeHtml(next.lesson.title)}</p>
      <button class="action-button" data-open-lesson="${next.topic.id}" data-lesson-index="${next.index}">${icon("next")}Open Lesson</button>
    </div>
  `;
}

function findNextLesson() {
  for (const [topicIndex, topic] of topics.entries()) {
    for (const [index, lesson] of topic.lessons.entries()) {
      if (!isLessonDone(topic.id, index)) {
        return { topic, lesson, index, color: colors[topicIndex % colors.length] };
      }
    }
  }
  return null;
}

function renderTopicCard(topic, index = topics.indexOf(topic)) {
  const pct = topicProgress(topic);
  return `
    <button class="topic-card" data-open-topic="${topic.id}" style="--accent:${colors[index % colors.length]};">
      <div class="topic-top">
        <div>
          <h3>${escapeHtml(topic.title)}</h3>
          <p>${escapeHtml(topic.summary)}</p>
        </div>
        <div class="topic-icon">${icon(topic.icon)}</div>
      </div>
      <div class="tag-row">
        ${topic.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div>
        <div class="topic-meta"><span>${topic.lessons.length} lessons</span><span>${pct}% done</span></div>
        <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="--progress:${pct}%"></div></div>
      </div>
    </button>
  `;
}

function renderLessons() {
  const query = state.query.trim().toLowerCase();
  const matches = topics.filter((topic) => {
    if (!query) return true;
    const haystack = [
      topic.title,
      topic.summary,
      topic.tags.join(" "),
      ...topic.lessons.flatMap((lesson) => [lesson.title, ...(lesson.body || []), ...(lesson.keyPoints || [])])
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  });

  if (!state.topicId || !topics.some((topic) => topic.id === state.topicId)) {
    state.topicId = topics[0].id;
  }

  const activeTopic = topics.find((topic) => topic.id === state.topicId);
  const activeLesson = activeTopic.lessons[state.lessonIndex] || activeTopic.lessons[0];
  state.lessonIndex = Math.min(state.lessonIndex, activeTopic.lessons.length - 1);

  return `
    <section class="section-head">
      <div>
        <h2>Lessons</h2>
        <p>Short readings with pseudocode, Python, and RAPTOR cues kept side by side.</p>
      </div>
    </section>
    <div class="search-row">
      <input type="search" value="${escapeHtml(state.query)}" data-search placeholder="Search topics, lessons, or terms">
      <button class="ghost-button" data-clear-search>${icon("reset")}Clear</button>
    </div>
    ${query ? `
      <section class="topic-grid" style="margin-bottom: 14px;">
        ${matches.length ? matches.map(renderTopicCard).join("") : `<div class="empty-state">No lesson matches found.</div>`}
      </section>
    ` : ""}
    <section class="lesson-layout">
      <aside class="panel lesson-list">
        ${topics.map((topic) => `
          <button class="lesson-nav-button ${topic.id === activeTopic.id ? "active" : ""}" data-select-topic="${topic.id}">
            ${escapeHtml(topic.title)}
            <span style="display:block;color:var(--muted);font-size:0.78rem;margin-top:4px;">${topicProgress(topic)}% complete</span>
          </button>
        `).join("")}
      </aside>
      <article class="lesson-detail">
        <div class="panel">
          <div class="lesson-title-row">
            <div>
              <div class="tag-row">${activeTopic.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
              <h2>${escapeHtml(activeLesson.title)}</h2>
              <p>${escapeHtml(activeTopic.title)} - Lesson ${state.lessonIndex + 1} of ${activeTopic.lessons.length}</p>
            </div>
            <div class="topic-icon" style="--accent:${colors[topics.indexOf(activeTopic) % colors.length]};">${icon(activeTopic.icon)}</div>
          </div>
        </div>
        ${renderLesson(activeLesson)}
        <div class="lesson-actions panel">
          <button class="ghost-button" data-prev-lesson>${icon("back")}Previous</button>
          <button class="action-button" data-complete-lesson="${activeTopic.id}" data-lesson-index="${state.lessonIndex}">
            ${icon("check")}${isLessonDone(activeTopic.id, state.lessonIndex) ? "Completed" : "Mark Complete"}
          </button>
          <button class="ghost-button" data-next-lesson>Next${icon("next")}</button>
        </div>
      </article>
    </section>
  `;
}

function renderLesson(lesson) {
  const parts = [];
  parts.push(`<section class="lesson-card">${lesson.body.map((text) => `<p>${escapeHtml(text)}</p>`).join("")}</section>`);
  if (lesson.keyPoints) parts.push(`<section class="lesson-card"><h3>Key Points</h3>${list(lesson.keyPoints)}</section>`);
  if (lesson.example) parts.push(`<section class="lesson-card"><h3>${escapeHtml(lesson.example.title)}</h3>${list(lesson.example.lines)}</section>`);
  if (lesson.pseudocode) parts.push(`<section class="lesson-card"><h3>Pseudocode</h3>${codeBlock(lesson.pseudocode)}</section>`);
  if (lesson.python) parts.push(`<section class="lesson-card"><h3>Python</h3>${codeBlock(lesson.python)}</section>`);
  if (lesson.raptor) parts.push(`<section class="lesson-card"><h3>RAPTOR</h3>${list(lesson.raptor)}</section>`);
  if (lesson.remember) parts.push(`<section class="note"><strong>Remember:</strong> ${escapeHtml(lesson.remember)}</section>`);
  return parts.join("");
}

function renderPractice() {
  if (!state.quiz) startQuiz(state.quizTopic);
  const quiz = state.quiz;
  const current = quiz.questions[quiz.index];
  const selected = quiz.answers[quiz.index];
  const answered = selected !== undefined;
  const flash = flashcards[state.flashIndex % flashcards.length];

  return `
    <section class="section-head">
      <div>
        <h2>Practice</h2>
        <p>Quick checks for vocabulary, logic tracing, RAPTOR mapping, and Python translation.</p>
      </div>
    </section>
    <section class="practice-layout">
      <div class="quiz-card">
        <div class="toolbar-row">
          <select data-quiz-topic title="Quiz topic">
            <option value="all" ${state.quizTopic === "all" ? "selected" : ""}>All topics</option>
            ${topics.map((topic) => `<option value="${topic.id}" ${state.quizTopic === topic.id ? "selected" : ""}>${escapeHtml(topic.title)}</option>`).join("")}
          </select>
          <button class="ghost-button" data-restart-quiz>${icon("reset")}New Quiz</button>
        </div>
        ${quiz.completed ? renderQuizSummary(quiz) : `
          <p class="tag">Question ${quiz.index + 1} of ${quiz.questions.length}</p>
          <h3>${escapeHtml(current.prompt)}</h3>
          <div class="choice-grid">
            ${current.choices.map((choice, index) => {
              let klass = "";
              if (answered && index === current.answer) klass = "correct";
              if (answered && index === selected && index !== current.answer) klass = "wrong";
              return `<button class="choice-button ${klass}" data-quiz-answer="${index}" ${answered ? "disabled" : ""}>${escapeHtml(choice)}</button>`;
            }).join("")}
          </div>
          ${answered ? `<div class="explain"><strong>${selected === current.answer ? "Correct." : "Not quite."}</strong> ${escapeHtml(current.why)}</div>` : ""}
          <div class="quiz-actions" style="margin-top: 14px;">
            <span>${quiz.answers.filter((answer, i) => answer === quiz.questions[i].answer).length} correct so far</span>
            <button class="action-button" data-next-question ${answered ? "" : "disabled"}>${quiz.index === quiz.questions.length - 1 ? "Finish" : "Next"}${icon("next")}</button>
          </div>
        `}
      </div>
      <aside class="quiz-card">
        <h3>Flashcards</h3>
        <div class="flashcard-face" data-toggle-flash>
          <span class="tag">${state.flashBack ? "Answer" : "Prompt"}</span>
          <strong>${escapeHtml(state.flashBack ? flash[0] : flash[1])}</strong>
        </div>
        <div class="quiz-actions" style="margin-top: 12px;">
          <button class="ghost-button" data-toggle-flash>${state.flashBack ? "Show Prompt" : "Show Answer"}</button>
          <button class="action-button" data-next-flash>Next${icon("next")}</button>
        </div>
      </aside>
    </section>
  `;
}

function renderQuizSummary(quiz) {
  const correct = quiz.answers.filter((answer, i) => answer === quiz.questions[i].answer).length;
  const percent = Math.round((correct / quiz.questions.length) * 100);
  return `
    <div class="empty-state">
      <h3>Quiz Complete</h3>
      <p>${correct} of ${quiz.questions.length} correct - ${percent}%</p>
      <button class="action-button" data-restart-quiz>${icon("reset")}Try Another Set</button>
    </div>
  `;
}

function startQuiz(topicId = "all") {
  const source = topicId === "all" ? questionBank : questionBank.filter((item) => item.topic === topicId);
  const questions = shuffle(source).slice(0, Math.min(10, source.length));
  state.quiz = { questions, index: 0, answers: [], completed: false };
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderRaptor() {
  const scenario = scenarios.find((item) => item.id === state.scenarioId) || scenarios[0];
  return `
    <section class="section-head">
      <div>
        <h2>Word Problem Translator</h2>
        <p>Move the same problem through clues, IPO, pseudocode, RAPTOR symbols, and Python.</p>
      </div>
      <button class="ghost-button" data-copy-scenario="${scenario.id}">${icon("copy")}${state.copyNotice || "Copy Pseudocode"}</button>
    </section>

    <section class="symbol-grid" style="margin-bottom: 14px;">
      ${renderSymbols()}
    </section>

    <section class="scenario-layout">
      <aside class="panel scenario-list">
        ${scenarios.map((item) => `
          <button class="scenario-button ${item.id === scenario.id ? "active" : ""}" data-select-scenario="${item.id}">
            <strong>${escapeHtml(item.title)}</strong>
            <span style="display:block;color:var(--muted);margin-top:5px;">${escapeHtml(item.brief)}</span>
          </button>
        `).join("")}
      </aside>
      <article class="lesson-detail">
        <div class="panel">
          <h2 style="margin:0;">${escapeHtml(scenario.title)}</h2>
          <p>${escapeHtml(scenario.brief)}</p>
        </div>
        <div class="translation-grid">
          <section class="lesson-card"><h3>English Clues</h3>${list(scenario.clues)}</section>
          <section class="lesson-card"><h3>IPO Sort</h3>${renderIpo(scenario.ipo)}</section>
          <section class="lesson-card"><h3>Pseudocode</h3>${codeBlock(scenario.pseudocode)}</section>
          <section class="lesson-card"><h3>Python Starter</h3>${codeBlock(scenario.python)}</section>
        </div>
        <section class="lesson-card">
          <h3>RAPTOR Build Plan</h3>
          <div class="flow-stack">
            ${scenario.raptor.map(([kind, text]) => `
              <div class="flow-step">
                ${shape(kind)}
                <div>${escapeHtml(text)}</div>
              </div>
            `).join("")}
          </div>
        </section>
        <section class="callout">
          <strong>RAPTOR branch sanity check:</strong>
          <p>Read a diamond as a question. If the condition is quantity <= 0, the Yes branch is the invalid path. If the condition is quantity > 0, the Yes branch is the valid path. Either can work, but the branch contents must match the question.</p>
        </section>
      </article>
    </section>
  `;
}

function renderSymbols() {
  const symbols = [
    ["start", "Start/End", "Program begins or ends."],
    ["input", "Input", "User types a value into a variable."],
    ["output", "Output", "Program displays text or values."],
    ["assignment", "Assignment", "Formula or stored value."],
    ["selection", "Selection", "Yes/No decision branch."],
    ["loop", "Loop", "Repeated steps."]
  ];
  return symbols.map(([kind, title, text]) => `
    <div class="symbol-panel">
      ${shape(kind, title)}
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
  `).join("");
}

function shape(kind, label) {
  const display = label || kind.charAt(0).toUpperCase() + kind.slice(1);
  return `<div class="raptor-shape shape-${kind}"><span>${escapeHtml(display)}</span></div>`;
}

function renderIpo(ipo) {
  return `
    <p><strong>Input</strong></p>${list(ipo.input)}
    <p><strong>Processing</strong></p>${list(ipo.processing)}
    <p><strong>Output</strong></p>${list(ipo.output)}
    <p><strong>Decision</strong></p>${list(ipo.decisions)}
  `;
}

function renderGlossary() {
  const query = state.query.trim().toLowerCase();
  const filtered = glossary.filter(([term, definition]) => {
    if (!query) return true;
    return `${term} ${definition}`.toLowerCase().includes(query);
  });
  return `
    <section class="section-head">
      <div>
        <h2>Glossary</h2>
        <p>Small definitions for the terms that keep showing up in pseudocode, Python, and RAPTOR.</p>
      </div>
    </section>
    <div class="search-row">
      <input type="search" value="${escapeHtml(state.query)}" data-search placeholder="Search glossary">
      <button class="ghost-button" data-clear-search>${icon("reset")}Clear</button>
    </div>
    <section class="glossary-grid">
      ${filtered.length ? filtered.map(([term, definition]) => `
        <article class="glossary-card">
          <h3>${escapeHtml(term)}</h3>
          <p>${escapeHtml(definition)}</p>
        </article>
      `).join("") : `<div class="empty-state">No glossary match found.</div>`}
    </section>
  `;
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("button, .flashcard-face");
  if (!target) return;

  if (target.dataset.nav) {
    state.view = target.dataset.nav;
    state.query = "";
    if (state.view === "practice" && !state.quiz) startQuiz(state.quizTopic);
    render();
    return;
  }

  if (target.dataset.openTopic) {
    state.view = "lessons";
    state.topicId = target.dataset.openTopic;
    state.lessonIndex = 0;
    state.query = "";
    render();
    return;
  }

  if (target.dataset.openLesson) {
    state.view = "lessons";
    state.topicId = target.dataset.openLesson;
    state.lessonIndex = Number(target.dataset.lessonIndex || 0);
    render();
    return;
  }

  if (target.dataset.selectTopic) {
    state.topicId = target.dataset.selectTopic;
    state.lessonIndex = 0;
    render();
    return;
  }

  if (target.dataset.prevLesson !== undefined) {
    moveLesson(-1);
    return;
  }

  if (target.dataset.nextLesson !== undefined) {
    moveLesson(1);
    return;
  }

  if (target.dataset.completeLesson) {
    progress.completed[completedKey(target.dataset.completeLesson, Number(target.dataset.lessonIndex))] = true;
    saveProgress();
    render();
    return;
  }

  if (target.dataset.clearSearch !== undefined) {
    state.query = "";
    render();
    return;
  }

  if (target.dataset.resetProgress !== undefined) {
    progress = { completed: {}, quizScores: [] };
    saveProgress();
    render();
    return;
  }

  if (target.dataset.quizAnswer !== undefined && state.quiz) {
    state.quiz.answers[state.quiz.index] = Number(target.dataset.quizAnswer);
    render();
    return;
  }

  if (target.dataset.nextQuestion !== undefined && state.quiz) {
    if (state.quiz.index < state.quiz.questions.length - 1) {
      state.quiz.index += 1;
    } else {
      finishQuiz();
    }
    render();
    return;
  }

  if (target.dataset.restartQuiz !== undefined) {
    startQuiz(state.quizTopic);
    render();
    return;
  }

  if (target.dataset.toggleFlash !== undefined || target.classList.contains("flashcard-face")) {
    state.flashBack = !state.flashBack;
    render();
    return;
  }

  if (target.dataset.nextFlash !== undefined) {
    state.flashIndex = (state.flashIndex + 1) % flashcards.length;
    state.flashBack = false;
    render();
    return;
  }

  if (target.dataset.selectScenario) {
    state.scenarioId = target.dataset.selectScenario;
    state.copyNotice = "";
    render();
    return;
  }

  if (target.dataset.copyScenario) {
    copyScenario(target.dataset.copyScenario);
  }
});

app.addEventListener("input", (event) => {
  if (event.target.matches("[data-search]")) {
    state.query = event.target.value;
    render();
  }
});

app.addEventListener("change", (event) => {
  if (event.target.matches("[data-quiz-topic]")) {
    state.quizTopic = event.target.value;
    startQuiz(state.quizTopic);
    render();
  }
});

function moveLesson(direction) {
  const topic = topics.find((item) => item.id === state.topicId) || topics[0];
  let nextIndex = state.lessonIndex + direction;
  let topicIndex = topics.indexOf(topic);

  if (nextIndex < 0 && topicIndex > 0) {
    topicIndex -= 1;
    state.topicId = topics[topicIndex].id;
    nextIndex = topics[topicIndex].lessons.length - 1;
  } else if (nextIndex >= topic.lessons.length && topicIndex < topics.length - 1) {
    topicIndex += 1;
    state.topicId = topics[topicIndex].id;
    nextIndex = 0;
  } else {
    nextIndex = Math.max(0, Math.min(nextIndex, topic.lessons.length - 1));
  }

  state.lessonIndex = nextIndex;
  render();
}

function finishQuiz() {
  const quiz = state.quiz;
  const correct = quiz.answers.filter((answer, i) => answer === quiz.questions[i].answer).length;
  const percent = Math.round((correct / quiz.questions.length) * 100);
  quiz.completed = true;
  progress.quizScores.push({
    date: new Date().toISOString(),
    topic: state.quizTopic,
    correct,
    total: quiz.questions.length,
    percent
  });
  progress.quizScores = progress.quizScores.slice(-20);
  saveProgress();
}

function copyScenario(id) {
  const scenario = scenarios.find((item) => item.id === id);
  if (!scenario) return;
  const text = scenario.pseudocode.join("\n");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      state.copyNotice = "Copied";
      render();
      window.setTimeout(() => {
        state.copyNotice = "";
        render();
      }, 1400);
    }).catch(() => {
      state.copyNotice = "Copy blocked";
      render();
    });
  } else {
    state.copyNotice = "Copy unavailable";
    render();
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

render();
