"use strict";

const STORAGE = {
  complete: "bip-complete-v2",
  bookmarks: "bip-bookmarks-v2",
  stats: "bip-topic-stats-v2",
  bestQuiz: "bip-best-quiz-v2",
  savedCards: "bip-saved-cards-v2"
};

let touchStartX = 0;
let touchEndX = 0;

const iconPaths = {
  exam: '<path d="M8 4h10v16H6V6a2 2 0 0 1 2-2Z"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h4"/>',
  cloud: '<path d="M17 18H8a5 5 0 1 1 1.3-9.8A7 7 0 0 1 23 10a4 4 0 0 1-1 8h-1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/><path d="m3 18 9 5 9-5"/>',
  code: '<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 4-4 16"/>',
  database: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
  shield: '<path d="M12 3 20 7v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V7l8-4Z"/><path d="m9 12 2 2 4-5"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.7 2.7-3-3 2.7-2.7Z"/>',
  chart: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5"/><path d="M12 16V8"/><path d="M16 16v-3"/>',
  cards: '<rect x="4" y="7" width="13" height="14" rx="2"/><path d="M8 3h10a2 2 0 0 1 2 2v12"/><path d="M8 12h5"/><path d="M8 16h3"/>',
  star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
  back: '<path d="M15 18 9 12l6-6"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v6"/><path d="M12 7h.01"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  loop: '<path d="M17 2v5h-5"/><path d="M20 12a8 8 0 1 1-2.34-5.66L17 7"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
  flow: '<path d="M6 3h12v6H6z"/><path d="M12 9v3"/><path d="M6 15h12v6H6z"/><path d="M8 12h8"/>',
  decision: '<path d="m12 3 9 9-9 9-9-9 9-9z"/><path d="M12 8v4"/><path d="M12 16h.01"/>'
};

function L(title, body, remember, sections = [], code = "") {
  return { title, body, remember, sections, code };
}

function S(title, items) {
  return { title, items };
}

const topics = [
  {
    id: "map",
    title: "Study Map",
    icon: "exam",
    lessons: [
      L("How The Pieces Fit", [
        "Beginner programming is one idea shown in several forms. The word problem is the story. The input, processing, output list is the sorting step. Pseudocode is the written plan. RAPTOR is the picture of the plan. Python is the runnable program.",
        "When a problem feels too large, do not start by typing code. First ask what the program must receive, what it must calculate or decide, and what it must display.",
        "The strongest path is always the same: understand the problem, design exact steps, translate those steps into symbols or code, test with simple values, then fix anything that does not match the expected result."
      ], "Word problem -> IPO -> pseudocode -> RAPTOR -> Python.", [
        S("Use This Order", [
          "Read the problem twice.",
          "Write the final output in one sentence.",
          "List every input the user must provide.",
          "Write each formula or decision in exact words.",
          "Build the flowchart or Python code only after the plan is clear."
        ]),
        S("What Each Form Is For", [
          "IPO helps you sort information before writing steps.",
          "Pseudocode lets you say the logic without strict Python syntax.",
          "RAPTOR helps you see the flow, branches, and repeated paths.",
          "Python turns the plan into instructions the interpreter can run."
        ])
      ]),
      L("The Program Development Cycle", [
        "Programming is a cycle, not a straight line. You analyze, design, code, test, and debug. If the test fails, you return to an earlier step and improve the plan.",
        "A common beginner mistake is skipping design and trying to solve the whole problem in Python syntax. That makes every mistake feel like a syntax problem, even when the real issue is the logic.",
        "Good pseudocode saves time because it exposes missing inputs, vague calculations, and branch problems before you are also dealing with punctuation, indentation, or RAPTOR dialog boxes."
      ], "Design first. Code second. Test often.", [
        S("Cycle Steps", [
          "Analyze: What is given? What is required?",
          "Design: Write IPO, pseudocode, and maybe a flowchart.",
          "Code: Translate the design into Python or RAPTOR.",
          "Test: Use values you can check by hand.",
          "Debug: Fix logic, syntax, spelling, type, or branch errors."
        ])
      ]),
      L("How To Study Without Copying", [
        "Use assignment-like patterns as practice, but do not memorize or copy one exact solution. Change the story, numbers, and variable names so you have to rebuild the logic yourself.",
        "A good practice session asks: What are the inputs? What is the formula? What output should appear? What would happen with small test values?",
        "When you can explain a solution in your own words, you can usually rebuild it in pseudocode, RAPTOR, or Python without needing the original example."
      ], "Learn the pattern, then write your own version.", [
        S("Safe Practice Method", [
          "Change names such as gallons to miles or cups to pounds.",
          "Keep the same structure but use new numbers.",
          "Trace your answer by hand.",
          "Explain why each line is there."
        ])
      ]),
      L("The Small Vocabulary", [
        "You do not need many words to write useful beginner pseudocode. Most early programs use Start, Declare, Write, Input, Set, If, Else, End If, While, End While, and End.",
        "The words are intentionally simple. Write asks or shows. Input receives. Set calculates or stores. Declare prepares a variable. If chooses. While repeats.",
        "Once you see those words as program actions, translating to RAPTOR and Python becomes more mechanical."
      ], "Write shows. Input receives. Set calculates. If chooses. While repeats.", [
        S("Core Words", [
          "Declare: name a variable and type.",
          "Write: show a prompt, message, or result.",
          "Input: get a value from the user.",
          "Set: calculate or assign a value.",
          "If: branch based on a true or false condition.",
          "While: repeat while a condition remains true."
        ])
      ]),
      L("Testing With Tiny Numbers", [
        "Testing is easier when the numbers are small enough to verify in your head. If a formula works for simple values, it is easier to trust it with larger values.",
        "For a tax problem, try a total of 100 and tax rate of 8. The tax should be 8. For an average, try 80 and 100. The average should be 90.",
        "If your program has decisions, test each branch. A range check needs a low invalid value, a high invalid value, and a valid value."
      ], "A test case should prove one small part of the logic.", [
        S("Test Case Checklist", [
          "One normal valid case.",
          "One low edge case.",
          "One high edge case.",
          "One invalid case for every validation rule.",
          "One case for every branch in a table or operator menu."
        ])
      ])
    ]
  },
  {
    id: "basics",
    title: "Computer Basics",
    icon: "cloud",
    lessons: [
      L("What A Program Is", [
        "A program is a set of instructions that tells a computer what to do. The computer does not understand intention. It follows the instructions exactly as written.",
        "Programming means creating those instructions in a language that can be translated for the machine. Python is easier for people to read than machine language, but it still has strict rules.",
        "The early goal is not to memorize every Python feature. The early goal is to think in clear steps."
      ], "A computer is literal, so the steps must be literal.", [
        S("Program Parts", [
          "Input: data that enters the program.",
          "Processing: calculations, comparisons, decisions, and updates.",
          "Output: information displayed or stored after processing."
        ])
      ]),
      L("Hardware, Software, And Memory", [
        "Hardware is the physical equipment. Software is the instructions and data that run on the hardware.",
        "The CPU carries out instructions. RAM holds working data while programs run. Storage keeps files and programs after power is off.",
        "Variables are names that let the program work with values in memory while it runs."
      ], "RAM is temporary working space; storage is long-term file space.", [
        S("Useful Terms", [
          "CPU: executes instructions.",
          "RAM: temporary memory used while programs run.",
          "Storage: long-term place for files.",
          "Software: programs and instructions."
        ])
      ]),
      L("Languages And Translation", [
        "High-level languages such as Python are designed for people to read and write. Low-level languages are closer to the machine.",
        "Assembly language can be useful when programmers need very detailed hardware control, but it is harder for beginners to read.",
        "Compiled languages translate source code before running. Interpreted languages usually read and run statements through an interpreter. Python commonly uses an interpreter."
      ], "Programming languages bridge human logic and machine instructions.", [
        S("Translation Ideas", [
          "Source code is the program text a programmer writes.",
          "A compiler translates code into another form before execution.",
          "An interpreter runs code by reading and executing statements."
        ])
      ]),
      L("Boolean Thinking", [
        "Boolean data has only two possible values: true or false.",
        "Every If condition asks a Boolean question. Is quantity less than zero? Is operator equal to plus? Is password correct?",
        "Boolean thinking matters because decisions, loops, validation, and many bugs depend on the exact true or false result."
      ], "A condition is a question with a true or false answer.", [
        S("Examples", [
          "quantity > 0",
          "operator == \"+\"",
          "score >= 70",
          "num1 < 0 OR num1 > 500"
        ])
      ]),
      L("Data Moving Through A Program", [
        "Most beginner programs move data through a simple path. The user enters values. The program stores those values in variables. The program calculates or decides. The program displays the result.",
        "A variable can be updated. If total starts at 0 and you set total = total + price, the old value helps create the new value.",
        "Trace tables are useful because they show how values change after each instruction."
      ], "Follow the data, and the logic becomes easier to see.", [
        S("Trace Table Columns", [
          "Line number.",
          "Variable values after the line runs.",
          "Output displayed, if any.",
          "Notes about branch choices."
        ])
      ])
    ]
  },
  {
    id: "design",
    title: "Program Design",
    icon: "layers",
    lessons: [
      L("Input Processing Output", [
        "Input, processing, output is the simplest planning tool for beginner programs. It turns a word problem into three buckets.",
        "Inputs are values the program must receive. Processing is the math or logic that changes inputs into results. Outputs are the values or messages the user must see.",
        "If a problem includes decisions, add a fourth note for conditions. Conditions explain when the program should branch."
      ], "IPO is the sorting table before pseudocode.", [
        S("IPO Questions", [
          "Input: What must the user type?",
          "Processing: What formulas or decisions happen?",
          "Output: What must be displayed?",
          "Conditions: What makes the program choose a path?"
        ])
      ]),
      L("Find Output First", [
        "The final output tells you where the program is going. If the program must display current balance, then all inputs and processing must support current balance.",
        "Working backward is powerful. To display liters, you need gallons and a conversion factor. To display gross pay, you need hours and pay rate.",
        "If you cannot name the output, you probably do not understand the problem yet."
      ], "The output is the target; processing is how you reach it.", [
        S("Backward Planning", [
          "Name the final result.",
          "Ask what formula creates it.",
          "Ask which values the formula needs.",
          "Mark which values are user input and which are fixed constants."
        ])
      ]),
      L("Clue Words In Word Problems", [
        "Word problems often hide programming actions inside normal English. Prompt, ask, enter, and type usually mean input. Calculate, compute, determine, convert, and find usually mean processing.",
        "Display, show, print, output, and report usually mean output. If, otherwise, when, valid, invalid, range, at least, and no more than usually mean a selection.",
        "Clue words help, but they do not replace understanding. Always connect the word back to the actual job."
      ], "Action words reveal program actions.", [
        S("Common Clues", [
          "Ask or enter -> Write prompt and Input variable.",
          "Calculate or convert -> Set variable = expression.",
          "Display or show -> Write result.",
          "If or otherwise -> Selection.",
          "Repeat, while, until -> Loop."
        ])
      ]),
      L("Constants And Fixed Values", [
        "A fixed value is a number or text that the problem gives and the user does not type. Examples include a tax rate, conversion factor, recipe amount, or shipping fee.",
        "You can use a fixed value directly in a formula, but a named constant can make the plan easier to understand.",
        "Do not declare literal values as if they were variables. Declare taxRate, not 8. Declare shippingFee, not 35."
      ], "A fixed value is part of processing, not user input.", [
        S("Good Constant Names", [
          "LITERS_PER_GALLON = 3.78541",
          "PENNIES_PER_QUARTER = 25",
          "FREE_SHIPPING_QUANTITY = 50",
          "BASE_RECIPE_COUNT = 20"
        ])
      ]),
      L("Echo Printing", [
        "Echo printing means displaying the input values along with the calculated results. This helps the user verify what they typed.",
        "Many assignment-style programs expect output to include both input and calculated values. If the problem says display all input values and all calculated results, echo printing is required.",
        "Use clear labels so each output value is easy to read."
      ], "Echo print inputs when the output should show what was entered.", [
        S("Output Labels", [
          "Company Name: ",
          "Quantity = ",
          "Retail price = $",
          "Tax = $",
          "Grand total = $"
        ])
      ])
    ]
  },
  {
    id: "pseudocode",
    title: "Pseudocode",
    icon: "file",
    lessons: [
      L("Clean Pseudocode Shape", [
        "Pseudocode is a plain-language plan. It is not Python, and it is not meant to run by itself.",
        "A clean beginner shape is Start, Declare variables, prompt and input values, set formulas, write outputs, and End.",
        "Keep each step short. Numbered steps are easier to trace and easier to translate into RAPTOR symbols."
      ], "Short, numbered, exact steps are easiest to translate.", [
        S("Basic Skeleton", [
          "Start",
          "Declare input variables.",
          "Declare calculated result variables.",
          "Write prompts and Input values.",
          "Set formulas.",
          "Write results.",
          "End"
        ])
      ], [
        "1. Start",
        "2. Declare gallons As Float",
        "3. Declare liters As Float",
        "4. Write \"Enter gallons:\"",
        "5. Input gallons",
        "6. Set liters = gallons * 3.78541",
        "7. Write \"Liters = \" + liters",
        "8. End"
      ].join("\n")),
      L("Declare, Input, Set, Write", [
        "Declare prepares a variable name and type. Input stores a value from the user. Set stores a calculated or assigned value. Write displays text or values.",
        "These four actions handle many early programming problems. When you feel stuck, ask which of the four actions the next line should perform.",
        "In RAPTOR, there is no separate Declare symbol. Variables are created when first given a value through Input or Assignment."
      ], "Declare prepares. Input receives. Set changes. Write displays.", [
        S("Common Mistakes", [
          "Using Write when the program needs to receive input.",
          "Using Input when the program needs to calculate.",
          "Writing a vague Set line without a formula.",
          "Displaying a result before it has been calculated."
        ])
      ]),
      L("Good Versus Weak Steps", [
        "A weak pseudocode line is vague or wordy. A strong pseudocode line tells the exact operation.",
        "For example, calculate the new price is weak. Set newPrice = bookPrice - bookPrice * discountRate / 100 is strong.",
        "Avoid using complete paragraphs inside pseudocode. Use plain commands that another programmer could translate."
      ], "If a line cannot be tested, make it more exact.", [
        S("Better Lines", [
          "Weak: get the first number from the user.",
          "Better: Input num1.",
          "Weak: calculate total.",
          "Better: Set total = price * quantity.",
          "Weak: show answer.",
          "Better: Write \"Total = \" + total."
        ])
      ]),
      L("Modules And Calls", [
        "A module is a named part of a program with one job. Larger pseudocode can be split into modules such as Input Data, Perform Calculations, and Display Results.",
        "Call means run a module, then return to the next line after the call.",
        "Modules make longer programs easier to read, but for small programs a single main module is often enough."
      ], "A module is a small named job.", [
        S("Typical Modules", [
          "Main module: controls the overall order.",
          "Input module: gets user values.",
          "Calculation module: performs formulas.",
          "Output module: displays results."
        ])
      ], [
        "Main module",
        "   Call InputData module",
        "   Call CalculateResults module",
        "   Call DisplayResults module",
        "End Program"
      ].join("\n")),
      L("Tracing Pseudocode", [
        "Tracing means walking through each line and recording variable values as they change.",
        "Only Write lines display output. Set lines change values. Input lines receive values. If lines choose paths.",
        "Tracing catches overwritten variables, wrong order of operations, missing initialization, and branch mistakes."
      ], "Trace values line by line, not by guessing.", [
        S("Trace Example", [
          "Set a = 12.8 -> a is 12.8.",
          "Set a = 15.0 -> a is now 15.0.",
          "Set b = 2 -> b is 2.",
          "Set c = a + a + b -> c is 32.0.",
          "Write c -> the screen shows 32.0."
        ])
      ])
    ]
  },
  {
    id: "variables",
    title: "Variables Types",
    icon: "database",
    lessons: [
      L("Variables As Named Storage", [
        "A variable is a name for a storage location. The program uses the name to remember, calculate with, and display a value.",
        "A variable can change. If dollars starts at 2.75 and later becomes 99.95, the current value is the last value assigned.",
        "Variable names should explain what the value means. totalCost is clearer than t or x."
      ], "A variable name is the label, not the value itself.", [
        S("Name Values You Need To Remember", [
          "User inputs.",
          "Calculated outputs.",
          "Temporary helper values.",
          "Counters and running totals.",
          "Rates, fees, and conversion factors if naming them improves clarity."
        ])
      ]),
      L("Naming Rules", [
        "Variable names should not contain spaces. Use camelCase, PascalCase, or underscores depending on the style expected.",
        "Do not start names with a number. Avoid punctuation such as dollar signs, percent signs, hyphens, and hashtags.",
        "Be consistent with capitalization. In many languages, total, Total, and TOTAL can be different names."
      ], "Descriptive, consistent names prevent strange bugs.", [
        S("Good Names", [
          "numberOfItems",
          "retailPrice",
          "taxRate",
          "taxAmount",
          "grandTotal",
          "operator"
        ]),
        S("Avoid", [
          "Tax Rate with a space.",
          "1Number starting with a digit.",
          "$total with punctuation.",
          "x when a clearer name is available."
        ])
      ]),
      L("Integer Float String Boolean", [
        "Integer is for whole numbers used for counting. Float is for decimal-capable values such as money, rates, measurements, and averages.",
        "String is for text. Character is a single symbol or letter. Boolean is true or false.",
        "Choosing the correct type helps the reader understand what kind of value belongs in the variable."
      ], "Integer counts. Float measures. String stores text. Boolean stores true or false.", [
        S("Type Choices", [
          "Integer: quantity, count, numberOfStudents.",
          "Float: price, taxRate, gallons, average.",
          "String: companyName, userName, password.",
          "Character: operator, response.",
          "Boolean: isValid, hasDiscount."
        ])
      ]),
      L("Python Variables", [
        "Python does not require Declare lines. A Python variable is created when a value is assigned to it.",
        "The equal sign performs assignment. The right side is evaluated first, then the result is stored in the left-side variable.",
        "Python variable names often use lowercase with underscores, such as gross_pay or grand_total."
      ], "Python creates variables through assignment.", [
        S("Python Habits", [
          "Use clear lowercase names with underscores.",
          "Assign before using a variable.",
          "Convert input text before math.",
          "Use comments for logic that is not obvious."
        ])
      ], [
        "quantity = int(input(\"Quantity: \"))",
        "price = float(input(\"Price: \"))",
        "total = quantity * price",
        "print(\"Total =\", total)"
      ].join("\n")),
      L("Initialization", [
        "Initialization means giving a variable a starting value before it is used.",
        "Counters often start at 0 or 1. Running totals usually start at 0. Boolean flags often start as true or false.",
        "Using a variable before it has a value causes errors in Python and RAPTOR."
      ], "Create a value before you use the variable.", [
        S("Common Starting Values", [
          "total = 0",
          "count = 0",
          "isValid = true",
          "result = 0 when a later branch will update it"
        ])
      ])
    ]
  },
  {
    id: "operators",
    title: "Operators",
    icon: "code",
    lessons: [
      L("Assignment And Comparison", [
        "One equals sign assigns a value. It changes the variable on the left.",
        "Double equals compares values. It asks whether the left and right side are equal.",
        "In pseudocode, Set total = price * quantity is assignment. If operator == \"+\" Then is comparison."
      ], "One equals stores. Two equals compares.", [
        S("Use Correctly", [
          "Assignment: Set money = 50.",
          "Comparison: If money == 50 Then.",
          "Invalid assignment: 50 = money.",
          "Python uses = for assignment and == for equality comparison."
        ])
      ]),
      L("Arithmetic Operators", [
        "Use + for addition, - for subtraction, * for multiplication, / for division, % for modulus, and ^ in many pseudocode or RAPTOR examples for exponentiation.",
        "In Python, exponentiation uses ** instead of ^.",
        "Modulus gives the remainder after division. 27 % 8 gives 3."
      ], "Use programming operators, not handwritten math symbols.", [
        S("Examples", [
          "total = price * quantity",
          "remaining = balance - withdrawal",
          "average = total / count",
          "remainder = 27 % 8",
          "squared = value ** 2 in Python"
        ])
      ]),
      L("Order Of Operations", [
        "Programs follow a standard order: parentheses first, exponents, multiplication/division/modulus, then addition/subtraction.",
        "Without parentheses, average = score1 + score2 / 2 divides score2 first, then adds score1. That is not the average of two scores.",
        "Use parentheses whenever the intended order could be misunderstood."
      ], "Parentheses are cheap protection against wrong math.", [
        S("Safe Formulas", [
          "average = (score1 + score2) / 2",
          "taxAmount = total * (taxRate / 100)",
          "discountedPrice = price - (price * discountRate / 100)"
        ])
      ]),
      L("Text Joining And Output", [
        "The plus sign can add numbers, but it can also join text in some pseudocode and RAPTOR output examples.",
        "Python is stricter. You cannot directly add a string and a number without converting the number or using comma-separated print items.",
        "Spaces inside quote marks are displayed exactly. If you want a space around an operator in output, include that space in the string."
      ], "Quote spacing affects the screen; operator spacing helps humans.", [
        S("Output Examples", [
          "\"Total = $\" + total in pseudocode-style output.",
          "print(\"Total = $\", total) in Python.",
          "str(num1) + operator + str(num2) + \" = \" + str(result) when building one string."
        ])
      ]),
      L("Percent And Rates", [
        "A whole-number percent such as 8 must usually be divided by 100 before multiplication.",
        "If the user enters 8 for 8 percent, the decimal rate is 8 / 100, or 0.08.",
        "Tax, discount, interest, and commission problems often use this pattern."
      ], "Whole-number percent must become a decimal rate before multiplication.", [
        S("Pattern", [
          "Input taxRate",
          "Set taxDecimal = taxRate / 100",
          "Set taxAmount = total * taxDecimal"
        ])
      ], [
        "tax_rate = float(input(\"Tax rate as a whole number: \"))",
        "tax_amount = total * (tax_rate / 100)"
      ].join("\n"))
    ]
  },
  {
    id: "python",
    title: "Python Basics",
    icon: "code",
    lessons: [
      L("Printing Output", [
        "The print function displays output on the screen. Text goes inside quote marks.",
        "A variable name should not be placed inside quotes when you want its value. print(\"total\") displays the word total. print(total) displays the value stored in total.",
        "You can print several items by separating them with commas."
      ], "Quoted text prints as text; unquoted variables print their values.", [
        S("Print Examples", [
          "print(\"Hello\")",
          "print(total)",
          "print(\"Total =\", total)",
          "print(\"The answer is\", answer)"
        ])
      ], [
        "room = 503",
        "print(\"I am staying in room number\")",
        "print(room)",
        "print(\"Room:\", room)"
      ].join("\n")),
      L("Getting Keyboard Input", [
        "Python input() pauses the program and lets the user type a value.",
        "The value returned by input() is text. If you need arithmetic, convert it with int() or float().",
        "The prompt can be written inside input(), which combines the prompt and input step."
      ], "input() gives text first; convert before math.", [
        S("Input Choices", [
          "Use int() for whole-number counts.",
          "Use float() for decimals, money, rates, and measurements.",
          "Use plain input() for names, words, and operator symbols."
        ])
      ], [
        "name = input(\"Enter name: \")",
        "quantity = int(input(\"Enter quantity: \"))",
        "price = float(input(\"Enter price: \"))"
      ].join("\n")),
      L("Comments And Readability", [
        "A comment is a note for humans that Python ignores. Comments start with #.",
        "Use comments to explain the purpose of a program, a tricky formula, or a decision rule. Do not comment every obvious line.",
        "Readable code uses good names, spacing, and simple structure."
      ], "Comments explain why, not every tiny what.", [
        S("Good Comment Uses", [
          "Describe the program at the top.",
          "Explain a formula from the problem.",
          "Mark major sections such as input, processing, and output.",
          "Clarify a decision table or validation rule."
        ])
      ], [
        "# Convert gallons to liters.",
        "liters = gallons * 3.78541"
      ].join("\n")),
      L("Python Formatting Basics", [
        "Beginner assignments often do not require formatted decimals, so follow the assignment requirements carefully.",
        "When formatting is allowed, Python f-strings can display values with labels and decimal places.",
        "Do not use a formatting feature if your current course material has not covered it and the assignment says not to use outside techniques."
      ], "Follow the expected style for the current lesson.", [
        S("Useful Later", [
          "f\"Total = ${total:.2f}\" displays two decimal places.",
          "round(value, 2) rounds a number for display.",
          "Comma-separated print is simpler for early practice."
        ])
      ], [
        "total = 12.3456",
        "print(\"Total =\", total)",
        "print(f\"Total = ${total:.2f}\")"
      ].join("\n")),
      L("Syntax Errors Versus Logic Errors", [
        "A syntax error means Python cannot understand the code grammar. Missing colons, unmatched quotes, and wrong indentation can cause syntax errors.",
        "A logic error means the program runs but produces the wrong answer. Wrong formulas, wrong branches, or wrong order of operations cause logic errors.",
        "Pseudocode helps reduce logic errors before Python syntax gets involved."
      ], "Running without crashing is not the same as being correct.", [
        S("Debug Questions", [
          "Did every variable get a value before use?",
          "Did input values get converted before math?",
          "Did the formula match the word problem?",
          "Did every branch get tested?"
        ])
      ])
    ]
  },
  {
    id: "decisions",
    title: "Decisions Logic",
    icon: "decision",
    lessons: [
      L("If Then Else", [
        "A decision structure lets a program choose between paths.",
        "A single-alternative If only does something when the condition is true. A dual-alternative If/Else does one thing when true and another when false.",
        "In RAPTOR, a Selection symbol creates Yes and No branches. In Python, indentation shows which statements belong to each branch."
      ], "A decision starts with a true or false question.", [
        S("Basic Shape", [
          "If condition Then",
          "   true path statements",
          "Else",
          "   false path statements",
          "End If"
        ])
      ], [
        "if quantity <= 0:",
        "    print(\"Invalid quantity\")",
        "else:",
        "    total = quantity * price",
        "    print(total)"
      ].join("\n")),
      L("Relational Operators", [
        "Relational operators compare values. The result is true or false.",
        "Use < for less than, <= for less than or equal to, > for greater than, >= for greater than or equal to, == for equal to, and != for not equal to.",
        "Use == in conditions when you want to check equality."
      ], "Relational operators build Boolean questions.", [
        S("Examples", [
          "score >= 70",
          "quantity <= 0",
          "operator == \"+\"",
          "password != \"secret\""
        ])
      ]),
      L("AND OR NOT", [
        "AND means both parts must be true. OR means at least one part must be true. NOT reverses true and false.",
        "Use AND when a value must be inside a valid range. Use OR when any bad condition should trigger an error.",
        "Parentheses can make mixed logic clearer."
      ], "Use OR to catch any invalid case.", [
        S("Range Thinking", [
          "Valid: number >= 0 AND number <= 500.",
          "Invalid: number < 0 OR number > 500.",
          "Both formulas describe the same range from opposite directions."
        ])
      ], [
        "if number < 0 or number > 500:",
        "    print(\"Number is outside the valid range\")"
      ].join("\n")),
      L("Input Validation", [
        "Validation checks input before the program uses it. This prevents impossible or unsafe calculations.",
        "If a quantity must be positive, check it before calculating totals. If a divisor cannot be zero, check it before division.",
        "Some programs display an error and stop. Later programs may use loops to keep asking until the input is valid."
      ], "Validate before calculating.", [
        S("Validation Examples", [
          "Quantity cannot be 0 or less.",
          "Number must be from 0 through 500.",
          "Operator must be +, -, *, or /.",
          "Denominator cannot be 0."
        ])
      ]),
      L("Decision Tables", [
        "A table of rates, categories, grades, or fees usually becomes a chain of decisions.",
        "Each row becomes one condition. Start at the smallest range and move upward, or start at the largest and move downward. Do not mix the order randomly.",
        "Once a row matches, the later rows should not overwrite the selected value."
      ], "A table is a decision chain.", [
        S("Discount Range Pattern", [
          "If quantity <= 9, rate is 0.",
          "Else if quantity <= 19, rate is 0.10.",
          "Else if quantity <= 39, rate is 0.15.",
          "Else use the next ranges until the final else."
        ])
      ])
    ]
  },
  {
    id: "loops",
    title: "Loops Validation",
    icon: "loop",
    lessons: [
      L("Why Loops Exist", [
        "A loop repeats a block of steps. Use loops when the same action must happen more than once.",
        "A while loop repeats while a condition is true. A for loop is often used when you know the number of repetitions.",
        "Every loop must have a way to stop. If the condition never changes, the loop can repeat forever."
      ], "A loop needs a condition and a path to stop.", [
        S("Loop Uses", [
          "Ask for multiple scores.",
          "Repeat until input is valid.",
          "Process every item in a list.",
          "Keep a running total."
        ])
      ]),
      L("While Loops", [
        "A while loop checks a condition before each repetition.",
        "The loop body should change something that can eventually make the condition false.",
        "Validation loops often start by reading a value, then repeat while the value is invalid."
      ], "While means keep going as long as the condition is true.", [
        S("Validation Shape", [
          "Input number.",
          "While number is invalid.",
          "Display error.",
          "Input number again.",
          "End While."
        ])
      ], [
        "number = int(input(\"Enter 1 through 10: \"))",
        "while number < 1 or number > 10:",
        "    print(\"Invalid\")",
        "    number = int(input(\"Enter 1 through 10: \"))"
      ].join("\n")),
      L("Counters And Running Totals", [
        "A counter tracks how many times something has happened. A running total adds values over time.",
        "Initialize counters and totals before the loop. Update them inside the loop.",
        "For five scores, a counter can control repetition while a total accumulates scores."
      ], "Initialize before the loop; update inside the loop.", [
        S("Common Updates", [
          "count = count + 1",
          "total = total + score",
          "itemsProcessed = itemsProcessed + 1",
          "balance = balance + deposit"
        ])
      ]),
      L("For Loops In Python", [
        "Python for loops are often used when you know how many times to repeat.",
        "range(5) produces five repetitions using values 0 through 4. range(1, 6) produces 1 through 5.",
        "For loops are useful for repeated input when the count is known."
      ], "Use for when the repetition count is known.", [
        S("Example Uses", [
          "Read 5 scores.",
          "Print numbers 1 through 10.",
          "Process each item in a list.",
          "Repeat a practice calculation a fixed number of times."
        ])
      ], [
        "total = 0",
        "for count in range(5):",
        "    score = float(input(\"Score: \"))",
        "    total = total + score",
        "average = total / 5"
      ].join("\n")),
      L("Sentinel Values", [
        "A sentinel is a special value that means stop. For example, the user might enter -1 when there are no more scores.",
        "Sentinel loops are useful when you do not know ahead of time how many values will be entered.",
        "The sentinel should not be processed as normal data."
      ], "A sentinel is a stop signal, not real data.", [
        S("Sentinel Pattern", [
          "Input first value.",
          "While value is not the sentinel.",
          "Process the value.",
          "Input the next value.",
          "End While."
        ])
      ])
    ]
  },
  {
    id: "functions",
    title: "Functions Modules",
    icon: "flow",
    lessons: [
      L("Functions As Named Jobs", [
        "A function is a named group of statements. Calling the function runs those statements.",
        "Functions help split a larger program into smaller jobs. This is similar to modules in pseudocode or Call symbols in RAPTOR.",
        "A good function name describes the job, such as get_input, calculate_total, or display_results."
      ], "A function should do one clear job.", [
        S("Why Use Functions", [
          "Reduce repeated code.",
          "Make long programs easier to read.",
          "Test small pieces separately.",
          "Match top-down design."
        ])
      ], [
        "def show_heading():",
        "    print(\"Practice Program\")",
        "",
        "show_heading()"
      ].join("\n")),
      L("Arguments", [
        "An argument is a value sent into a function. A parameter is the variable name that receives it inside the function.",
        "Arguments let a function work with different values without relying on hidden global variables.",
        "For example, calculate_total(price, quantity) can work for any price and quantity."
      ], "Arguments carry values into a function.", [
        S("Argument Example", [
          "price and quantity are sent into the function.",
          "The function uses them in a formula.",
          "The caller gets the calculated answer."
        ])
      ], [
        "def calculate_total(price, quantity):",
        "    total = price * quantity",
        "    return total"
      ].join("\n")),
      L("Return Values", [
        "A return value is the answer a function sends back to the caller.",
        "Use return when the rest of the program needs the calculated value.",
        "Printing inside a function displays information, but returning gives the program a value it can keep using."
      ], "Return sends an answer back.", [
        S("Print Versus Return", [
          "print displays something now.",
          "return hands a value back to the caller.",
          "A function can return a total, discount, tax, or validation result."
        ])
      ]),
      L("Top-Down Design", [
        "Top-down design starts with the big program goal, then breaks it into smaller named tasks.",
        "A shipping calculator might have get_input, choose_discount_rate, calculate_totals, and display_results.",
        "This makes the program easier to read because the main section shows the order of jobs."
      ], "Main should read like a table of contents.", [
        S("Top-Down Steps", [
          "Write the main program as a few calls.",
          "Define each called module or function.",
          "Give each function one clear purpose.",
          "Test each piece with simple values."
        ])
      ]),
      L("Local And Global Values", [
        "A local variable is created inside a function and normally exists only inside that function.",
        "A global variable is created outside functions and can be seen more broadly, but relying on globals can make programs harder to debug.",
        "Passing arguments and returning values usually creates clearer beginner programs."
      ], "Prefer passing values over depending on hidden globals.", [
        S("Cleaner Function Flow", [
          "Input values in one place.",
          "Pass values into calculation functions.",
          "Return calculated results.",
          "Display results in one place."
        ])
      ])
    ]
  },
  {
    id: "raptor",
    title: "RAPTOR",
    icon: "flow",
    lessons: [
      L("RAPTOR Symbol Map", [
        "RAPTOR is a flowchart tool. It lets you focus on logic without writing full Python syntax.",
        "Each flowchart symbol matches a type of pseudocode action. Start and End mark boundaries. Input receives values. Output displays values. Assignment calculates or stores. Selection branches. Loop repeats. Call runs a subchart.",
        "The fastest build method is to translate one pseudocode line at a time."
      ], "Pseudocode line type tells you the RAPTOR symbol.", [
        S("Symbol Match", [
          "Start or End -> Oval.",
          "Input variable -> Input parallelogram.",
          "Write result -> Output parallelogram.",
          "Set variable = expression -> Assignment rectangle.",
          "If condition -> Selection diamond.",
          "While or repeat -> Loop symbol.",
          "Call module -> Call symbol."
        ])
      ]),
      L("Input And Output Symbols", [
        "An Input symbol receives a value and stores it in a variable. It can also display a prompt depending on how the dialog is filled out.",
        "An Output symbol displays text, variables, results, headings, or error messages.",
        "Comments are not output. A comment is a note for the programmer or grader. Output is something the user sees."
      ], "Input stores; Output displays; comments explain.", [
        S("Output Tips", [
          "Put literal text in quotes.",
          "Use variable names when you want values.",
          "Include spaces inside quoted text when the screen needs spaces.",
          "Use comments to explain the logic, not to display results."
        ])
      ]),
      L("Assignment Symbols", [
        "An Assignment symbol stores a value in a variable or calculates a new value.",
        "The receiving variable is on the left. The expression is on the right. The expression is evaluated first.",
        "Use one assignment symbol per important calculation when you want the flowchart to be easy to read."
      ], "Assignment changes a variable.", [
        S("Examples", [
          "total = quantity * price",
          "tax = total * (taxRate / 100)",
          "average = total / count",
          "counter = counter + 1"
        ])
      ]),
      L("Selection Diamonds", [
        "A Selection diamond asks a yes or no question. The Yes branch runs when the condition is true. The No branch runs when it is false.",
        "Branch mistakes happen when the condition says one thing but the steps are placed as if it says the opposite.",
        "Read the diamond out loud before adding symbols to the branches."
      ], "Match branch actions to the exact question in the diamond.", [
        S("Branch Sanity Check", [
          "Condition: quantity <= 0.",
          "Yes branch: display invalid quantity error.",
          "No branch: continue calculations.",
          "Condition: quantity > 0 would reverse those branches."
        ])
      ]),
      L("Common RAPTOR Errors", [
        "Variable not found usually means a variable was used before it was created or the name is misspelled.",
        "Type errors happen when a variable starts as a number and later receives text, or starts as text and later receives a number.",
        "Bad output often comes from missing quote marks around text or missing spaces inside quoted labels."
      ], "Most RAPTOR errors are spelling, order, type, or branch errors.", [
        S("Fix Checklist", [
          "Check spelling and capitalization of every variable.",
          "Make sure each variable has an Input or Assignment before use.",
          "Keep numeric variables numeric and text variables text.",
          "Verify Yes and No branches match the condition.",
          "Separate comments from Output symbols."
        ])
      ])
    ]
  },
  {
    id: "patterns",
    title: "Word Patterns",
    icon: "tool",
    lessons: [
      L("Conversion Pattern", [
        "A conversion problem asks for a value in one unit and displays the value in another unit.",
        "The important pieces are the input unit, conversion factor, formula, and output unit.",
        "For gallons to liters, the formula is liters = gallons * 3.78541."
      ], "Input unit times conversion factor equals output unit.", [
        S("Conversion Steps", [
          "Declare input value and converted value.",
          "Prompt and input the original unit.",
          "Set converted value using the factor.",
          "Display the converted value with a label."
        ])
      ], [
        "gallons = float(input(\"Gallons: \"))",
        "liters = gallons * 3.78541",
        "print(\"Liters =\", liters)"
      ].join("\n")),
      L("Recipe Scaling Pattern", [
        "Recipe scaling uses a base recipe and a desired amount.",
        "First calculate the scale factor: desired amount divided by original amount. Then multiply each original ingredient by the scale factor.",
        "This pattern works for donuts, paint mixture, serving sizes, batches, or any proportional recipe."
      ], "Scale factor = desired amount / original amount.", [
        S("Recipe Steps", [
          "Input desired amount.",
          "Set scaleFactor = desiredAmount / originalAmount.",
          "Set each needed ingredient = scaleFactor * original ingredient.",
          "Display each needed ingredient."
        ])
      ]),
      L("Coin Total Pattern", [
        "A coin total problem uses counts and fixed coin values.",
        "Each coin count is multiplied by its value, then the results are added.",
        "Use Integer for coin counts and total pennies because they are whole-number counts."
      ], "Count times value, then add.", [
        S("Formula", [
          "totalPennies = quarters * 25 + dimes * 10 + nickels * 5",
          "Use clear names for each count.",
          "Do not put coin values in quote marks because they are numbers."
        ])
      ]),
      L("Bank Balance Pattern", [
        "A balance problem usually begins with a starting balance and changes it using deposits and withdrawals.",
        "Deposits increase the balance. Withdrawals decrease it.",
        "The current balance is starting balance plus deposits minus withdrawals."
      ], "Current balance = starting + deposits - withdrawals.", [
        S("Bank Steps", [
          "Input startingBalance.",
          "Input depositAmount.",
          "Input withdrawalAmount.",
          "Set currentBalance = startingBalance + depositAmount - withdrawalAmount.",
          "Display currentBalance."
        ])
      ]),
      L("Shipping Discount Pattern", [
        "A shipping and discount problem combines several ideas: input, validation, rate table, tax, shipping rule, and final total.",
        "Calculate tax according to the order described in the problem. If tax is before discount, use the original total before subtracting discount.",
        "For shipping rules, write a clear decision: if quantity is at least the free-shipping threshold, shipping is 0; otherwise shipping is the flat fee."
      ], "Do validation first, then rates, then final total.", [
        S("Processing Order", [
          "Validate quantity.",
          "Calculate total = quantity * retailPrice.",
          "Choose discountRate from the table.",
          "Calculate discount.",
          "Calculate tax based on the required order.",
          "Choose shipping fee.",
          "Calculate grandTotal."
        ])
      ])
    ]
  },
  {
    id: "calculator",
    title: "Calculator Logic",
    icon: "chart",
    lessons: [
      L("Calculator Inputs", [
        "A simple calculator usually needs two numbers and one operator.",
        "If the numbers must be within a range, validate both numbers before asking for the operator or calculating a result.",
        "The operator is text, so compare it with quoted symbols such as \"+\" or \"/\"."
      ], "Validate numbers before choosing the operation.", [
        S("Inputs", [
          "num1: numeric.",
          "num2: numeric.",
          "operator: text or character.",
          "result: numeric calculated output."
        ])
      ]),
      L("Operator Branches", [
        "Each allowed operator becomes a branch. Plus adds, minus subtracts, star multiplies, and slash divides.",
        "Use an error branch when the operator is not one of the allowed choices.",
        "Nested selections or else-if chains both work as long as only the matching operation runs."
      ], "Each operator is one decision path.", [
        S("Branch Map", [
          "operator == \"+\" -> result = num1 + num2.",
          "operator == \"-\" -> result = num1 - num2.",
          "operator == \"*\" -> result = num1 * num2.",
          "operator == \"/\" -> check denominator, then divide.",
          "Else -> invalid operator."
        ])
      ]),
      L("Division By Zero", [
        "Division by zero is not allowed. If the operator is division, check the second number before dividing.",
        "The second number is the denominator. If it is 0, display an error and do not calculate division.",
        "This is a special validation rule inside the division branch."
      ], "Check num2 before dividing by num2.", [
        S("Safe Division", [
          "If operator == \"/\" Then",
          "   If num2 == 0 Then display error.",
          "   Else result = num1 / num2.",
          "End If."
        ])
      ]),
      L("Expression Output", [
        "Calculator output often displays the expression and result together.",
        "If the sample output has no spaces around the operator, match it. If it has spaces, include those spaces inside the output text.",
        "In Python, convert numbers to strings if you build one combined output string."
      ], "Output spacing must match the desired screen display.", [
        S("Examples", [
          "15+4 = 19",
          "15 + 4 = 19",
          "Both can be correct if they match the expected style."
        ])
      ]),
      L("Calculator Test Cases", [
        "A calculator has many branches, so it needs multiple test cases.",
        "Test a low invalid number, a high invalid number, an invalid operator, each valid operator, and division by zero.",
        "A program that only works for addition is not finished."
      ], "Every branch needs a test.", [
        S("Minimum Tests", [
          "num1 too low.",
          "num2 too high.",
          "invalid operator.",
          "addition.",
          "subtraction.",
          "multiplication.",
          "division.",
          "division by zero."
        ])
      ])
    ]
  },
  {
    id: "collections",
    title: "Lists Strings",
    icon: "list",
    lessons: [
      L("Lists Hold Many Values", [
        "A list stores multiple values under one name.",
        "Lists are useful for scores, names, prices, or repeated values when you do not want a separate variable for each item.",
        "Python list indexes start at 0, so the first item is scores[0]."
      ], "A list is one name with many positions.", [
        S("List Actions", [
          "Create a list.",
          "Append new values.",
          "Loop through values.",
          "Use len() for count.",
          "Use sum() for numeric totals."
        ])
      ], [
        "scores = [82, 91, 77]",
        "average = sum(scores) / len(scores)",
        "print(average)"
      ].join("\n")),
      L("Tuples", [
        "A tuple is a sequence like a list, but it is normally not changed after creation.",
        "Tuples are useful when values belong together and should stay fixed.",
        "For beginner programs, lists are more common when values need to be added or changed."
      ], "Tuple values are grouped and usually unchanged.", [
        S("Examples", [
          "point = (4, 9)",
          "rgb = (120, 255, 60)",
          "Use a list when you plan to append or update."
        ])
      ]),
      L("String Basics", [
        "A string stores text. Names, prompts, passwords, operators, and messages are strings.",
        "Strings are sequences of characters. Python can inspect, slice, search, and clean them.",
        "If a number is inside quote marks, it is text until converted."
      ], "Text that looks numeric is still text until converted.", [
        S("String Methods", [
          "strip() removes extra spaces.",
          "lower() makes text lowercase.",
          "upper() makes text uppercase.",
          "in checks whether text contains another piece of text."
        ])
      ]),
      L("Processing User Text", [
        "User input often includes extra spaces or unexpected capitalization.",
        "For menu choices, it can help to strip spaces and normalize case before comparing.",
        "For operator symbols, strip spaces so a user typing a space around + does not break the comparison."
      ], "Clean text before comparing it.", [
        S("Text Cleanup", [
          "operator = operator.strip()",
          "answer = answer.lower()",
          "name = name.strip()"
        ])
      ], [
        "operator = input(\"Operator: \").strip()",
        "if operator == \"+\":",
        "    print(\"Add\")"
      ].join("\n")),
      L("When Not To Use Lists Yet", [
        "Sometimes a shorter Python feature is not the right choice for the assignment.",
        "If the current material is practicing variables, formulas, and decisions, use those tools unless the assignment says lists are allowed.",
        "Learning the expected pattern matters more than producing the shortest possible code."
      ], "Use the tool the lesson is practicing.", [
        S("Early-Course Discipline", [
          "Use separate variables when lists have not been covered.",
          "Avoid advanced formatting if the instructions say not to format.",
          "Use covered decision structures even if you know another shortcut."
        ])
      ])
    ]
  },
  {
    id: "files",
    title: "Files Errors",
    icon: "file",
    lessons: [
      L("Why Files Matter", [
        "Variables disappear when a program ends. Files can keep data after the program stops.",
        "Programs can write output to files, read input from files, and process stored records.",
        "File work is important when a program needs more than one run or more data than a user should type each time."
      ], "Files let data persist beyond one run.", [
        S("File Uses", [
          "Save results.",
          "Read lists of values.",
          "Store records.",
          "Create reports."
        ])
      ]),
      L("Reading And Writing", [
        "Python can open files for reading or writing. The with statement is helpful because it closes the file automatically.",
        "Writing stores text in a file. Reading brings file contents into the program.",
        "A newline character, written as \\n, moves file output to the next line."
      ], "Use with open(...) so Python handles closing.", [
        S("Modes", [
          "\"r\" means read.",
          "\"w\" means write and replace.",
          "\"a\" means append.",
          "Text files store strings."
        ])
      ], [
        "with open(\"notes.txt\", \"w\") as file:",
        "    file.write(\"Python practice\\n\")"
      ].join("\n")),
      L("Records And Fields", [
        "A field is one piece of data. A record is a group of related fields.",
        "For example, name, quantity, and price can be fields in one product record.",
        "Files can contain many records, and programs can process each record in order."
      ], "Field is one value; record is a related group.", [
        S("Record Examples", [
          "Student record: name, score, grade.",
          "Product record: itemName, quantity, price.",
          "Sale record: date, customer, total."
        ])
      ]),
      L("Exceptions", [
        "An exception is an error that happens while the program is running.",
        "Converting the text hello to an integer causes a ValueError. Opening a missing file can cause a file error.",
        "Python can handle exceptions with try and except, but use this only when the lesson has reached it."
      ], "Exceptions handle runtime problems.", [
        S("Common Runtime Problems", [
          "User types text when a number is required.",
          "File does not exist.",
          "Division by zero.",
          "A variable is used before assignment."
        ])
      ]),
      L("Validation Before Exceptions", [
        "Validation checks known rules before a calculation. Exceptions handle problems that happen during execution.",
        "For beginner work, simple validation often comes before exception handling.",
        "A clear validation message helps the user fix the input."
      ], "Validation prevents expected bad input.", [
        S("Validation Messages", [
          "Please enter a positive quantity.",
          "Number must be from 0 through 500.",
          "Operator must be +, -, *, or /.",
          "Cannot divide by zero."
        ])
      ])
    ]
  }
];

let questionCounter = 0;

const manualQuestions = [
  q("map", "Which order best matches the normal planning path?", ["Python -> RAPTOR -> output -> IPO", "Word problem -> IPO -> pseudocode -> RAPTOR -> Python", "Input -> syntax -> compiler -> storage", "Loop -> string -> file -> output"], 1, "The safest path is to understand the story, sort it with IPO, plan with pseudocode, then translate."),
  q("basics", "What does Boolean data represent?", ["Whole numbers only", "Text only", "True or false", "A file record"], 2, "Boolean data has exactly two possible values: true or false."),
  q("design", "The word 'display' in a word problem usually means:", ["Input", "Write", "Declare", "Loop"], 1, "Display, show, print, and output all point to Write or Output."),
  q("pseudocode", "Which pseudocode line is most exact?", ["Calculate total", "Do the math", "Set total = price * quantity", "Find the answer"], 2, "The exact formula makes the step testable and translatable."),
  q("variables", "Which type best fits cups of flour that may include decimals?", ["Integer", "Float", "String", "Boolean"], 1, "Ingredient measurements can have decimals, so Float is the best fit."),
  q("operators", "What does % calculate?", ["A percent automatically", "A remainder", "A string length", "A comparison"], 1, "Modulus gives the remainder after division."),
  q("python", "What does input() return before conversion?", ["Integer", "Float", "String text", "Boolean"], 2, "Python input() returns text first."),
  q("decisions", "Which condition catches a number outside 0 through 500?", ["number >= 0 AND number <= 500", "number < 0 OR number > 500", "number == 0 AND number == 500", "number != 0 OR number != 500"], 1, "Any value below 0 or above 500 is invalid, so OR catches either bad case."),
  q("loops", "What must a loop have to avoid repeating forever?", ["A string variable", "A way for the condition to become false", "A file", "A comment after every line"], 1, "A loop must eventually change something that can stop it."),
  q("functions", "What does return do?", ["Displays a value only", "Sends a value back to the caller", "Creates a loop", "Deletes a variable"], 1, "return gives the caller a value to use later."),
  q("raptor", "Which RAPTOR symbol matches Set total = price * quantity?", ["Input", "Output", "Assignment", "Loop"], 2, "Set statements translate to Assignment symbols."),
  q("patterns", "For recipe scaling, what is the usual scale factor?", ["original / desired", "desired / original", "desired + original", "original % desired"], 1, "Desired amount divided by original amount gives the multiplier."),
  q("calculator", "What must be checked before division?", ["num1 == 0", "num2 == 0", "operator == '+'", "result == 0"], 1, "The second number is the denominator, so check it before dividing."),
  q("collections", "What index is the first item in a Python list?", ["0", "1", "-1", "10"], 0, "Python list indexes start at 0."),
  q("files", "What does a with open(...) block help with?", ["Closing the file properly", "Creating a RAPTOR diamond", "Converting strings to floats", "Choosing a discount rate"], 0, "The with statement handles file cleanup such as closing.")
];

function q(topic, prompt, choices, answer, explanation, lessonIndex = null) {
  questionCounter += 1;
  return { id: `${topic}-${questionCounter}`, topic, lessonIndex, prompt, choices, answer, explanation };
}

function generatedQuestions() {
  const remembers = topics.flatMap((topic) => topic.lessons.map((lesson, lessonIndex) => ({
    topic: topic.id,
    lessonIndex,
    title: lesson.title,
    remember: lesson.remember
  }))).filter((item) => item.remember);
  const allItems = topics.flatMap((topic) => topic.lessons.flatMap((lesson, lessonIndex) =>
    (lesson.sections || []).flatMap((section) => (section.items || []).map((item) => ({
      topic: topic.id,
      lessonIndex,
      title: lesson.title,
      section: section.title,
      item
    })))
  ));
  const questions = [];
  remembers.forEach((item) => {
    const pool = remembers.filter((other) => other.remember !== item.remember).map((other) => other.remember);
    questions.push(makeQuestion(item.topic, item.lessonIndex, `Which takeaway best matches "${item.title}"?`, item.remember, pool, `The key takeaway is: ${item.remember}`));
  });
  allItems.forEach((item) => {
    const pool = allItems.filter((other) => other.item !== item.item).map((other) => other.item);
    questions.push(makeQuestion(item.topic, item.lessonIndex, `Which detail belongs with "${item.title}"?`, item.item, pool, `This detail belongs to ${item.title}.`));
  });
  return questions;
}

function makeQuestion(topic, lessonIndex, prompt, correct, pool, explanation) {
  const choices = makeChoices(correct, pool);
  return {
    id: `${topic}-${lessonIndex}-${prompt.slice(0, 18).replace(/[^a-z0-9]+/gi, "-")}-${Math.random().toString(36).slice(2)}`,
    topic,
    lessonIndex,
    prompt,
    choices,
    answer: choices.indexOf(correct),
    explanation
  };
}

function makeChoices(correct, pool) {
  const unique = [...new Set(pool.filter((item) => item && item !== correct))];
  const picked = shuffle(unique).slice(0, 3);
  while (picked.length < 3) picked.push(["Input receives values.", "Set calculates values.", "Write displays values.", "If chooses a branch."][picked.length]);
  return shuffle([correct, ...picked]);
}

const fullQuestionBank = [...manualQuestions, ...generatedQuestions()];

const flashCardBank = [
  fc("IPO", "Input, Processing, Output. A planning table for word problems.", "design"),
  fc("Pseudocode", "A plain-language plan for program logic.", "pseudocode"),
  fc("Variable", "A named storage location for a value.", "variables"),
  fc("Integer", "A whole-number type used for counts.", "variables"),
  fc("Float", "A decimal-capable type used for money, rates, and measurements.", "variables"),
  fc("String", "Text data such as names, prompts, and operators.", "variables"),
  fc("Boolean", "A true or false value.", "basics"),
  fc("Assignment", "Putting the value on the right into the variable on the left.", "operators"),
  fc("Comparison", "A true or false check such as operator == '+'.", "operators"),
  fc("Selection", "A decision structure with true and false paths.", "decisions"),
  fc("Loop", "A structure that repeats steps.", "loops"),
  fc("Counter", "A variable that tracks repetitions.", "loops"),
  fc("Accumulator", "A variable that keeps a running total.", "loops"),
  fc("Function", "A named block of statements with one job.", "functions"),
  fc("Argument", "A value passed into a function.", "functions"),
  fc("Return", "A value sent back from a function.", "functions"),
  fc("Input Symbol", "A RAPTOR symbol that receives a user value.", "raptor"),
  fc("Output Symbol", "A RAPTOR symbol that displays text or values.", "raptor"),
  fc("Assignment Symbol", "A RAPTOR symbol that calculates or stores a value.", "raptor"),
  fc("Selection Diamond", "A RAPTOR symbol that asks a yes or no question.", "raptor"),
  fc("Validation", "Checking input before using it.", "decisions"),
  fc("Sentinel", "A special value that means stop.", "loops"),
  fc("List", "A Python sequence that stores multiple values.", "collections"),
  fc("Exception", "A runtime problem that Python can handle with try and except.", "files")
];

function fc(term, definition, topic) {
  return { id: `${topic}-${term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, term, definition, topic };
}

const state = {
  screen: "home",
  topicId: null,
  lessonIndex: 0,
  quizIndex: 0,
  activeQuestions: [],
  answers: {},
  selected: null,
  quizTopic: null,
  quizSourceLessonIndex: null,
  resultSaved: false,
  flashCards: [],
  flashIndex: 0,
  flashFlipped: false,
  flashFilterTopic: "all",
  searchQuery: "",
  complete: load(STORAGE.complete, {}),
  bookmarks: load(STORAGE.bookmarks, {}),
  savedCards: load(STORAGE.savedCards, {})
};

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function svg(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.exam}</svg>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function topicById(id) {
  return topics.find((topic) => topic.id === id) || topics[0];
}

function progress() {
  const totalLessons = topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  const doneLessons = Object.keys(state.complete).length;
  const bestQuiz = load(STORAGE.bestQuiz, 0);
  const stats = load(STORAGE.stats, {});
  const attempts = Object.values(stats).reduce((sum, item) => sum + (item.attempts || 0), 0);
  return { totalLessons, doneLessons, bestQuiz, attempts };
}

function render() {
  const app = document.getElementById("app");
  if (state.screen === "topic") app.innerHTML = renderTopic();
  else if (state.screen === "lesson") app.innerHTML = renderLesson();
  else if (state.screen === "quiz") app.innerHTML = renderQuiz();
  else if (state.screen === "flashcards") app.innerHTML = renderFlashCards();
  else if (state.screen === "flashSubjects") app.innerHTML = renderFlashSubjectPicker();
  else if (state.screen === "search") app.innerHTML = renderSearch();
  else app.innerHTML = renderHome();
  wire();
  animateStats();
}

function topbar(title, right = "info") {
  const rightIcon = right === "starGold" ? "star" : right;
  const rightAction = rightIcon === "star" ? "star" : rightIcon;
  const rightClass = right === "starGold" ? "gold" : "";
  const back = state.screen === "home" ? "<div></div>" : `<button class="icon-button" data-action="back" aria-label="Back">${svg("back")}</button>`;
  return `
    <header class="topbar">
      ${back}
      <div><h1 class="title">${escapeHtml(title)}</h1></div>
      <button class="icon-button ${rightClass}" data-action="${rightAction}" aria-label="${rightAction}">${svg(rightIcon)}</button>
    </header>
  `;
}

function renderHome() {
  const p = progress();
  const pct = Math.round((p.doneLessons / p.totalLessons) * 100);
  return `
    <main class="screen">
      ${topbar("BringItOnPython")}
      <p class="subtitle">Python and pseudocode swipe study</p>
      <section class="hero-stat" aria-label="Study stats">
        <div class="stat-card">
          <div class="stat-ring" style="--value:${pct}%;"><div class="stat-ring-inner"><strong>${p.doneLessons}/${p.totalLessons}</strong></div></div>
          <span>lessons</span>
        </div>
        <div class="stat-card">
          <div class="stat-ring readiness-build" style="--value:${Math.min(100, p.attempts * 8)}%;"><div class="stat-ring-inner"><strong>${p.attempts}</strong></div></div>
          <span>quiz runs</span>
        </div>
        <div class="stat-card">
          <div class="stat-ring" style="--value:${p.bestQuiz}%;"><div class="stat-ring-inner"><strong>${p.bestQuiz}%</strong></div></div>
          <span>best quiz</span>
        </div>
      </section>
      <section class="study-dashboard">
        <div class="readiness-card">
          <div>
            <span>Study Path</span>
            <strong>${p.doneLessons ? "Keep Building" : "Start With The Map"}</strong>
            <small>Open a subject tile, read the lessons, then run the fresh 10-question quiz at the end.</small>
          </div>
          <button class="mini-action" data-action="startDailyDrill">10 Q</button>
        </div>
      </section>
      ${renderHomeBookmarks()}
      <section class="topic-grid">
        <button class="topic-card feature-card" data-action="startDailyDrill" aria-label="Quick Drill">
          <span class="topic-icon">${svg("exam")}</span>
          <span>Quick Drill</span>
        </button>
        <button class="topic-card feature-card" data-action="openSearch" aria-label="Search">
          <span class="topic-icon">${svg("search")}</span>
          <span>Search</span>
        </button>
        <button class="topic-card feature-card" data-action="startFlashCards" aria-label="Flash Cards">
          <span class="topic-icon">${svg("cards")}</span>
          <span>Flash Cards</span>
        </button>
        ${topics.map((topic) => `
          <button class="topic-card" data-topic="${topic.id}" aria-label="${escapeHtml(topic.title)}">
            <span class="topic-icon">${svg(topic.icon)}</span>
            <span>${escapeHtml(topic.title)}</span>
          </button>
        `).join("")}
      </section>
    </main>
  `;
}

function renderHomeBookmarks() {
  const items = Object.keys(state.bookmarks).map((key) => {
    const [topicId, lessonText] = key.split(":");
    const topic = topicById(topicId);
    const lessonIndex = Number(lessonText);
    const lesson = topic.lessons[lessonIndex];
    return lesson ? { topic, lesson, lessonIndex } : null;
  }).filter(Boolean).slice(0, 4);
  if (!items.length) return "";
  return `
    <section class="bookmark-panel">
      <div class="section-heading"><h2>Saved Lessons</h2><span>${items.length}</span></div>
      <div class="bookmark-list">
        ${items.map((item) => `
          <button class="bookmark-row" data-bookmark-topic="${item.topic.id}" data-bookmark-lesson="${item.lessonIndex}">
            <span class="bookmark-star">${svg("star")}</span>
            <span><strong>${escapeHtml(item.lesson.title)}</strong><small>${escapeHtml(item.topic.title)}</small></span>
            <span class="chevron">&rsaquo;</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTopic() {
  const topic = topicById(state.topicId);
  return `
    <main class="screen topic-screen">
      ${topbar(topic.title)}
      <section class="list">
        ${topic.lessons.map((lesson, index) => `
          <button class="lesson-row" data-lesson="${index}">
            <span class="mini-icon">${state.complete[`${topic.id}:${index}`] ? svg("check") : index + 1}</span>
            <strong>${escapeHtml(lesson.title)}</strong>
            <span class="chevron">&rsaquo;</span>
          </button>
        `).join("")}
        <button class="lesson-row" data-action="topicQuiz">
          <span class="mini-icon">Q</span>
          <strong>Quiz: ${escapeHtml(topic.title)}</strong>
          <span class="chevron">&rsaquo;</span>
        </button>
      </section>
    </main>
  `;
}

function renderLesson() {
  const topic = topicById(state.topicId);
  const lesson = topic.lessons[state.lessonIndex];
  const key = `${topic.id}:${state.lessonIndex}`;
  const bookmarked = Boolean(state.bookmarks[key]);
  return `
    <main class="screen reader">
      ${topbar(topic.title, bookmarked ? "starGold" : "star")}
      <article class="reader-card" data-swipe="lesson">
        <h2>${escapeHtml(lesson.title)}</h2>
        ${(lesson.body || []).map((para) => `<p>${escapeHtml(para)}</p>`).join("")}
        ${renderLessonSections(lesson.sections)}
        ${lesson.remember ? `<div class="memory-box">${escapeHtml(lesson.remember)}</div>` : ""}
        ${lesson.code ? `<pre class="code-strip">${escapeHtml(lesson.code)}</pre>` : ""}
      </article>
      ${dots(topic.lessons.length, state.lessonIndex)}
      <nav class="bottom-nav">
        <button class="icon-button" data-action="prevLesson" aria-label="Previous">${svg("back")}</button>
        <button class="pill-button secondary" data-action="markDone">Done</button>
        <button class="pill-button" data-action="lessonQuiz">Quiz</button>
        <button class="icon-button" data-action="nextLesson" aria-label="Next">${svg("next")}</button>
      </nav>
    </main>
  `;
}

function renderLessonSections(sections = []) {
  if (!sections.length) return "";
  return `
    <div class="lesson-sections">
      ${sections.map((section) => `
        <section class="lesson-section">
          <h3>${escapeHtml(section.title)}</h3>
          <ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      `).join("")}
    </div>
  `;
}

function renderQuiz() {
  const questions = state.activeQuestions;
  const current = questions[state.quizIndex];
  if (!current) return renderResults(questions);
  const record = state.answers[current.id];
  const checked = Boolean(record);
  const selected = checked ? record.selected : state.selected;
  return `
    <main class="screen quiz-screen" data-swipe="quiz">
      ${topbar(quizTitle())}
      <section class="quiz-panel">
        <div class="quiz-circles">${questions.map((_, index) => `<span class="${index === state.quizIndex ? "active" : ""} ${state.answers[questions[index].id] ? "done" : ""}">${index + 1}</span>`).join("")}</div>
        <p class="question">${state.quizIndex + 1}. ${escapeHtml(current.prompt)}</p>
        <section class="answer-list">
          ${current.choices.map((choice, index) => {
            let cls = selected === index ? "selected" : "";
            if (checked && index === current.answer) cls += " correct";
            if (checked && selected === index && index !== current.answer) cls += " wrong";
            return `
              <button class="answer ${cls}" data-answer="${index}">
                <span class="answer-letter">${String.fromCharCode(65 + index)}.</span>
                <span class="answer-text">${escapeHtml(choice)}</span>
              </button>
            `;
          }).join("")}
        </section>
        ${checked ? `<div class="feedback">${escapeHtml(current.explanation)}</div>` : ""}
      </section>
      <nav class="quiz-actions">
        <button class="quiz-nav-button" data-action="prevQuestion">${svg("back")}<span>Prev</span></button>
        <button class="quiz-primary ${checked ? (record.correct ? "correct" : "wrong") : ""}" data-action="check">${checked ? (record.correct ? "Correct" : "Review") : "Check"}</button>
        <button class="quiz-ghost" data-action="showAnswer">Show Answer</button>
        <button class="quiz-nav-button" data-action="nextQuestion"><span>Next</span>${svg("next")}</button>
      </nav>
    </main>
  `;
}

function renderResults(questions) {
  const correct = questions.filter((item) => state.answers[item.id]?.correct).length;
  const score = Math.round((correct / questions.length) * 100);
  const missed = questions.filter((item) => state.answers[item.id] && !state.answers[item.id].correct);
  if (!state.resultSaved) {
    recordQuizResult(questions, correct);
    state.resultSaved = true;
  }
  return `
    <main class="screen">
      ${topbar("Quiz Results")}
      <section class="score-card">
        <p>${correct} of ${questions.length} correct</p>
        <div class="score">${score}%</div>
        <p>${score >= 80 ? "Strong work. Run another fresh set to keep it sharp." : "Keep going. Review missed questions and try a fresh set."}</p>
        ${missed.length ? `<button class="pill-button" data-action="reviewMissed">Review Missed (${missed.length})</button>` : ""}
        <button class="pill-button" data-action="restartQuiz">Fresh 10 Questions</button>
        <button class="pill-button secondary" data-action="goHome">Home</button>
      </section>
    </main>
  `;
}

function renderFlashCards() {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  const card = cards[state.flashIndex] || cards[0];
  const saved = Boolean(state.savedCards[card.id]);
  return `
    <main class="screen flash-screen" data-swipe="flashcards">
      ${topbar("Flash Cards")}
      <div class="flash-meta"><span>${state.flashIndex + 1} / ${cards.length}</span><span>${escapeHtml(flashSubjectTitle(state.flashFilterTopic))}</span></div>
      <div class="flash-tools">
        <button class="flash-tool" data-action="chooseFlashSubject">Subject</button>
        <button class="flash-tool ${saved ? "saved" : ""}" data-action="saveFlashCard">${saved ? "Saved" : "Save"}</button>
        <button class="flash-tool" data-action="openFlashTopic">Open Tile</button>
      </div>
      <button class="flash-card ${state.flashFlipped ? "flipped" : ""}" data-action="flipFlashCard">
        <span class="flash-label">${state.flashFlipped ? "Answer" : "Term"}</span>
        <strong>${escapeHtml(state.flashFlipped ? card.definition : card.term)}</strong>
        <small>${state.flashFlipped ? "Tap to see the term" : "Tap to reveal the answer"}</small>
      </button>
      ${dots(cards.length, state.flashIndex)}
      <nav class="bottom-nav">
        <button class="icon-button" data-action="prevFlashCard">${svg("back")}</button>
        <button class="pill-button secondary" data-action="shuffleFlashCards">Shuffle</button>
        <button class="pill-button" data-action="flipFlashCard">Flip</button>
        <button class="icon-button" data-action="nextFlashCard">${svg("next")}</button>
      </nav>
    </main>
  `;
}

function renderFlashSubjectPicker() {
  const subjects = flashSubjects();
  return `
    <main class="screen topic-screen">
      ${topbar("Choose Subject")}
      <section class="list">
        ${subjects.map((subject) => `
          <button class="lesson-row" data-flash-topic="${subject.id}">
            <span class="mini-icon">${subject.id === "all" ? "All" : svg(subject.icon)}</span>
            <strong>${escapeHtml(subject.title)}</strong>
            <span class="subject-count">${subject.count}</span>
          </button>
        `).join("")}
      </section>
    </main>
  `;
}

function renderSearch() {
  return `
    <main class="screen topic-screen">
      ${topbar("Search")}
      <section class="search-panel">
        <input id="searchBox" class="search-input" type="search" value="${escapeHtml(state.searchQuery)}" placeholder="Search variables, loops, RAPTOR..." autocomplete="off">
        <div class="search-results">${renderSearchResults(state.searchQuery)}</div>
      </section>
    </main>
  `;
}

function renderSearchResults(query) {
  const results = searchItems(query);
  if (!query.trim()) return `<p class="empty-note">Search lessons and flash cards by term, symbol, or problem pattern.</p>`;
  if (!results.length) return `<p class="empty-note">No matches yet. Try a shorter term.</p>`;
  return results.map((item) => {
    if (item.kind === "lesson") {
      return `
        <button class="search-row" data-search-topic="${item.topic.id}" data-search-lesson="${item.lessonIndex}">
          <span>Lesson</span><strong>${escapeHtml(item.lesson.title)}</strong><small>${escapeHtml(item.topic.title)}</small>
        </button>
      `;
    }
    return `
      <button class="search-row" data-search-card="${item.card.id}">
        <span>Flash Card</span><strong>${escapeHtml(item.card.term)}</strong><small>${escapeHtml(topicById(item.card.topic).title)}</small>
      </button>
    `;
  }).join("");
}

function quizTitle() {
  if (state.quizTopic === "daily") return "Fresh 10 Drill";
  const topic = topicById(state.quizTopic);
  return `${topic.title} Quiz`;
}

function dots(total, active) {
  return `<div class="progress-strip">${Array.from({ length: total }, (_, index) => `<span class="progress-dot ${index === active ? "active" : ""}"></span>`).join("")}</div>`;
}

function startQuiz(topicId, options = {}) {
  state.screen = "quiz";
  state.quizTopic = topicId;
  state.quizSourceLessonIndex = typeof options.lessonIndex === "number" ? options.lessonIndex : null;
  state.quizIndex = 0;
  state.selected = null;
  state.answers = {};
  state.resultSaved = false;
  const source = options.questions || pickQuizSource(topicId, state.quizSourceLessonIndex);
  state.activeQuestions = source.map(randomizeQuestion);
  render();
}

function pickQuizSource(topicId, lessonIndex = null) {
  if (topicId === "daily") return shuffle(fullQuestionBank).slice(0, 10);
  const lessonQuestions = typeof lessonIndex === "number"
    ? fullQuestionBank.filter((item) => item.topic === topicId && item.lessonIndex === lessonIndex)
    : [];
  const topicQuestions = fullQuestionBank.filter((item) => item.topic === topicId && !lessonQuestions.some((qItem) => qItem.id === item.id));
  const combined = [...shuffle(lessonQuestions), ...shuffle(topicQuestions)];
  const seen = new Set();
  const picked = [];
  combined.forEach((item) => {
    if (!seen.has(item.id) && picked.length < 10) {
      picked.push(item);
      seen.add(item.id);
    }
  });
  if (picked.length < 10) {
    shuffle(fullQuestionBank).forEach((item) => {
      if (!seen.has(item.id) && picked.length < 10) {
        picked.push(item);
        seen.add(item.id);
      }
    });
  }
  return shuffle(picked).slice(0, 10);
}

function randomizeQuestion(item) {
  const choices = item.choices.map((text, index) => ({ text, correct: index === item.answer }));
  const shuffled = shuffle(choices);
  return {
    ...item,
    id: `${item.id}-${Math.random().toString(36).slice(2)}`,
    choices: shuffled.map((choice) => choice.text),
    answer: shuffled.findIndex((choice) => choice.correct)
  };
}

function recordQuizResult(questions, correct) {
  const score = Math.round((correct / questions.length) * 100);
  const best = Math.max(load(STORAGE.bestQuiz, 0), score);
  save(STORAGE.bestQuiz, best);
  const stats = load(STORAGE.stats, {});
  questions.forEach((question) => {
    if (!stats[question.topic]) stats[question.topic] = { correct: 0, total: 0, attempts: 0 };
    stats[question.topic].total += 1;
    stats[question.topic].attempts += 1;
    if (state.answers[question.id]?.correct) stats[question.topic].correct += 1;
  });
  if (state.quizTopic) {
    if (!stats[state.quizTopic]) stats[state.quizTopic] = { correct: 0, total: 0, attempts: 0 };
    stats[state.quizTopic].attempts += 1;
  }
  save(STORAGE.stats, stats);
}

function checkAnswer() {
  const current = currentQuestion();
  if (!current || state.answers[current.id] || state.selected === null) return;
  state.answers[current.id] = {
    selected: state.selected,
    correct: state.selected === current.answer
  };
  render();
}

function showAnswer() {
  const current = currentQuestion();
  if (!current || state.answers[current.id]) return;
  state.answers[current.id] = { selected: current.answer, correct: true };
  state.selected = current.answer;
  render();
}

function currentQuestion() {
  return state.activeQuestions[state.quizIndex];
}

function moveQuestion(direction) {
  const next = state.quizIndex + direction;
  state.selected = null;
  if (next < 0) return;
  if (next >= state.activeQuestions.length) {
    state.quizIndex = state.activeQuestions.length;
  } else {
    state.quizIndex = next;
  }
  render();
}

function moveLesson(direction) {
  const topic = topicById(state.topicId);
  const next = state.lessonIndex + direction;
  if (next >= 0 && next < topic.lessons.length) {
    state.lessonIndex = next;
  } else if (next >= topic.lessons.length) {
    state.screen = "topic";
  }
  render();
}

function markDone() {
  state.complete[`${state.topicId}:${state.lessonIndex}`] = true;
  save(STORAGE.complete, state.complete);
}

function back() {
  if (state.screen === "home") return;
  if (state.screen === "lesson" || state.screen === "quiz") state.screen = "topic";
  else if (state.screen === "topic" || state.screen === "flashcards" || state.screen === "search" || state.screen === "flashSubjects") state.screen = "home";
  render();
}

function toggleBookmark() {
  if (state.screen !== "lesson") return;
  const key = `${state.topicId}:${state.lessonIndex}`;
  if (state.bookmarks[key]) delete state.bookmarks[key];
  else state.bookmarks[key] = true;
  save(STORAGE.bookmarks, state.bookmarks);
  render();
}

function startFlashCards(topicId = "all") {
  const cards = topicId === "saved"
    ? flashCardBank.filter((card) => state.savedCards[card.id])
    : topicId === "all" ? flashCardBank : flashCardBank.filter((card) => card.topic === topicId);
  state.screen = "flashcards";
  state.flashCards = shuffle(cards.length ? cards : flashCardBank);
  state.flashIndex = 0;
  state.flashFlipped = false;
  state.flashFilterTopic = topicId;
  render();
}

function flashSubjects() {
  const subjects = [{ id: "all", title: "All Flash Cards", icon: "cards", count: flashCardBank.length }];
  const savedCount = flashCardBank.filter((card) => state.savedCards[card.id]).length;
  if (savedCount) subjects.push({ id: "saved", title: "Saved Flash Cards", icon: "star", count: savedCount });
  topics.forEach((topic) => {
    const count = flashCardBank.filter((card) => card.topic === topic.id).length;
    if (count) subjects.push({ id: topic.id, title: topic.title, icon: topic.icon, count });
  });
  return subjects;
}

function flashSubjectTitle(topicId) {
  if (topicId === "all") return "All subjects";
  if (topicId === "saved") return "Saved cards";
  return topicById(topicId).title;
}

function moveFlashCard(direction) {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  state.flashIndex = (state.flashIndex + direction + cards.length) % cards.length;
  state.flashFlipped = false;
  render();
}

function toggleSaveFlashCard() {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  const card = cards[state.flashIndex];
  if (!card) return;
  if (state.savedCards[card.id]) delete state.savedCards[card.id];
  else state.savedCards[card.id] = true;
  save(STORAGE.savedCards, state.savedCards);
  render();
}

function openFlashTopic() {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  const card = cards[state.flashIndex];
  if (!card) return;
  state.screen = "topic";
  state.topicId = card.topic;
  render();
}

function searchItems(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const results = [];
  topics.forEach((topic) => {
    topic.lessons.forEach((lesson, lessonIndex) => {
      const haystack = [
        topic.title,
        lesson.title,
        ...(lesson.body || []),
        lesson.remember || "",
        ...(lesson.sections || []).flatMap((section) => [section.title, ...(section.items || [])])
      ].join(" ").toLowerCase();
      if (haystack.includes(needle)) results.push({ kind: "lesson", topic, lesson, lessonIndex });
    });
  });
  flashCardBank.forEach((card) => {
    const haystack = `${card.term} ${card.definition} ${topicById(card.topic).title}`.toLowerCase();
    if (haystack.includes(needle)) results.push({ kind: "flash", card });
  });
  return results.slice(0, 30);
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function animateStats() {
  setTimeout(() => {
    document.querySelectorAll(".stat-ring").forEach((ring) => {
      const value = ring.style.getPropertyValue("--value") || "0%";
      const color = ring.classList.contains("readiness-build") ? "var(--green)" : "var(--accent)";
      ring.style.background = `conic-gradient(${color} ${value}, rgba(255,255,255,0.08) 0)`;
    });
  }, 80);
}

function addSwipe(element) {
  element.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  element.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 70) return;
    if (element.dataset.swipe === "lesson") moveLesson(delta < 0 ? 1 : -1);
    if (element.dataset.swipe === "quiz") moveQuestion(delta < 0 ? 1 : -1);
    if (element.dataset.swipe === "flashcards") moveFlashCard(delta < 0 ? 1 : -1);
  }, { passive: true });
}

function wire() {
  document.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "topic";
      state.topicId = button.dataset.topic;
      state.lessonIndex = 0;
      render();
    });
  });
  document.querySelectorAll("[data-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.lessonIndex = Number(button.dataset.lesson);
      render();
    });
  });
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = currentQuestion();
      if (!current || state.answers[current.id]) return;
      state.selected = Number(button.dataset.answer);
      render();
    });
  });
  document.querySelectorAll("[data-bookmark-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.topicId = button.dataset.bookmarkTopic;
      state.lessonIndex = Number(button.dataset.bookmarkLesson);
      render();
    });
  });
  document.querySelectorAll("[data-flash-topic]").forEach((button) => {
    button.addEventListener("click", () => startFlashCards(button.dataset.flashTopic));
  });
  document.querySelectorAll("[data-search-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.topicId = button.dataset.searchTopic;
      state.lessonIndex = Number(button.dataset.searchLesson);
      render();
    });
  });
  document.querySelectorAll("[data-search-card]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = flashCardBank.find((item) => item.id === button.dataset.searchCard);
      if (!card) return;
      state.screen = "flashcards";
      state.flashCards = [card];
      state.flashIndex = 0;
      state.flashFlipped = false;
      state.flashFilterTopic = card.topic;
      render();
    });
  });
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => act(button.dataset.action));
  });
  document.querySelectorAll("[data-swipe]").forEach(addSwipe);
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.addEventListener("input", () => {
      state.searchQuery = searchBox.value;
      const results = document.querySelector(".search-results");
      if (results) results.innerHTML = renderSearchResults(state.searchQuery);
      wire();
    });
  }
}

function act(action) {
  if (action === "back") return back();
  if (action === "info") return alert("Swipe left or right on lesson, quiz, and flash card screens. Progress is stored only on this device.");
  if (action === "star") return toggleBookmark();
  if (action === "startDailyDrill") return startQuiz("daily");
  if (action === "startFlashCards") return startFlashCards();
  if (action === "openSearch") {
    state.screen = "search";
    state.searchQuery = "";
    return render();
  }
  if (action === "topicQuiz") return startQuiz(state.topicId);
  if (action === "lessonQuiz") return startQuiz(state.topicId, { lessonIndex: state.lessonIndex });
  if (action === "prevLesson") return moveLesson(-1);
  if (action === "nextLesson") return moveLesson(1);
  if (action === "markDone") {
    markDone();
    return moveLesson(1);
  }
  if (action === "check") return checkAnswer();
  if (action === "showAnswer") return showAnswer();
  if (action === "prevQuestion") return moveQuestion(-1);
  if (action === "nextQuestion") return moveQuestion(1);
  if (action === "reviewMissed") {
    const missed = state.activeQuestions.filter((item) => state.answers[item.id] && !state.answers[item.id].correct);
    return startQuiz(state.quizTopic || "daily", { questions: missed.length ? missed : pickQuizSource(state.quizTopic || "daily") });
  }
  if (action === "restartQuiz") return startQuiz(state.quizTopic || "daily", { lessonIndex: state.quizSourceLessonIndex });
  if (action === "goHome") {
    state.screen = "home";
    return render();
  }
  if (action === "chooseFlashSubject") {
    state.screen = "flashSubjects";
    return render();
  }
  if (action === "flipFlashCard") {
    state.flashFlipped = !state.flashFlipped;
    return render();
  }
  if (action === "saveFlashCard") return toggleSaveFlashCard();
  if (action === "shuffleFlashCards") return startFlashCards(state.flashFilterTopic);
  if (action === "prevFlashCard") return moveFlashCard(-1);
  if (action === "nextFlashCard") return moveFlashCard(1);
  if (action === "openFlashTopic") return openFlashTopic();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

render();
