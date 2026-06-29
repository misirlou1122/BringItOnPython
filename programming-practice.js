"use strict";

(function exposeProgrammingPractice(global) {
  const TOPICS = [
    { id: "loop-basics", title: "Loop Basics", icon: "loop", summary: "Recognize repetition, counters, and flowchart loop conditions." },
    { id: "while-loops", title: "While Loops", icon: "loop", summary: "Trace pretest loops and decide when repetition stops." },
    { id: "validation-loops", title: "Validation Loops", icon: "shield", summary: "Keep asking until an entered value follows the rules." },
    { id: "accumulators", title: "Accumulators", icon: "chart", summary: "Build running totals, counts, and averages safely." },
    { id: "nested-loops", title: "Nested Loops", icon: "layers", summary: "Follow an inner loop through every outer-loop pass." },
    { id: "arrays-lists", title: "Arrays / Lists", icon: "list", summary: "Store and process groups of related values." },
    { id: "array-indexing", title: "Array Indexing", icon: "database", summary: "Find, update, and reverse elements by position." },
    { id: "trace-output", title: "Trace the Output", icon: "search", summary: "Predict exactly what a short algorithm displays." },
    { id: "write-pseudocode", title: "Write the Pseudocode", icon: "flow", summary: "Turn a short requirement into ordered program steps." },
    { id: "mixed-review", title: "Mixed Review", icon: "exam", summary: "Blend loops, validation, totals, and collections in one set." }
  ];

  const templates = [];

  function add(topic, definitions) {
    definitions.forEach((definition) => {
      templates.push({ topic, ...definition });
    });
  }

  function integer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(items) {
    return items[integer(0, items.length - 1)];
  }

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = integer(0, index);
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function token() {
    return Math.random().toString(36).slice(2, 9);
  }

  function question(template, details) {
    const choices = details.choices
      ? shuffle([...new Set(details.choices.map((choice) => String(choice)))])
      : [];
    return {
      id: template.id + "-" + token(),
      topic: template.topic,
      type: template.type,
      difficulty: template.difficulty,
      prompt: details.prompt,
      choices,
      correctAnswer: String(details.correctAnswer),
      explanation: details.explanation,
      tags: [...template.tags],
      ...(details.code ? { code: details.code } : {}),
      ...(details.requiredGroups ? { requiredGroups: details.requiredGroups } : {})
    };
  }

  function output(values) {
    return values.join(" ");
  }

  function trueFalse(id, difficulty, tags, build) {
    return { id, type: "true_false", difficulty, tags, build };
  }

  function multipleChoice(id, difficulty, tags, build) {
    return { id, type: "multiple_choice", difficulty, tags, build };
  }

  function traceOutput(id, difficulty, tags, build) {
    return { id, type: "trace_output", difficulty, tags, build };
  }

  function shortResponse(id, difficulty, tags, build) {
    return { id, type: "short_response", difficulty, tags, build };
  }

  add("loop-basics", [
    trueFalse("loop-purpose", "warm-up", ["loops", "repetition"], (template) => question(template, {
      prompt: "A loop can replace several nearly identical instructions with one repeatable structure.",
      choices: ["True", "False"],
      correctAnswer: "True",
      explanation: "Loops reduce duplicated steps when the same action must happen more than once."
    })),
    multipleChoice("loop-story-signal", "warm-up", ["loops", "recognition"], (template) => {
      const count = integer(4, 9);
      return question(template, {
        prompt: "A program must display a reminder " + count + " times. Which structure best fits the repeated work?",
        choices: ["A loop", "A single decision", "One input statement", "One output statement"],
        correctAnswer: "A loop",
        explanation: "The display action repeats a known number of times, so a loop is the clearest structure."
      });
    }),
    traceOutput("loop-count-up", "level-up", ["loops", "counter", "trace"], (template) => {
      const start = integer(1, 4);
      const step = integer(1, 3);
      const passes = integer(3, 5);
      const stop = start + step * (passes - 1);
      const values = Array.from({ length: passes }, (_, index) => start + index * step);
      return question(template, {
        prompt: "What is displayed?",
        code: "FOR number = " + start + " TO " + stop + " STEP " + step + "\n    DISPLAY number\nEND FOR",
        choices: [output(values), output(values.slice().reverse()), output(values.map((value) => value + step)), String(stop)],
        correctAnswer: output(values),
        explanation: "The counter starts at " + start + " and increases by " + step + " after each display."
      });
    }),
    traceOutput("loop-count-down", "level-up", ["loops", "counter", "negative-step"], (template) => {
      const start = integer(7, 12);
      const step = integer(1, 3);
      const passes = integer(3, 4);
      const stop = start - step * (passes - 1);
      const values = Array.from({ length: passes }, (_, index) => start - index * step);
      return question(template, {
        prompt: "What is displayed?",
        code: "FOR count = " + start + " DOWN TO " + stop + " STEP " + step + "\n    DISPLAY count\nEND FOR",
        choices: [output(values), output(values.slice().reverse()), output(values.slice(1)), String(start - step * passes)],
        correctAnswer: output(values),
        explanation: "A downward loop subtracts the step after every pass."
      });
    }),
    multipleChoice("loop-diamond", "warm-up", ["flowchart", "condition", "loop"], (template) => question(template, {
      prompt: "In a flowchart, which symbol tests whether a loop should continue?",
      choices: ["Decision diamond", "Input/output shape", "Start/end oval", "Set/calculation rectangle"],
      correctAnswer: "Decision diamond",
      explanation: "A loop condition is a true-or-false test, so it belongs in a decision diamond."
    })),
    shortResponse("loop-write-counter", "challenge", ["loops", "pseudocode", "counter"], (template) => {
      const limit = integer(3, 7);
      return question(template, {
        prompt: "Write short pseudocode that displays the numbers 1 through " + limit + ".",
        correctAnswer: "FOR count = 1 TO " + limit + "\n    DISPLAY count\nEND FOR",
        explanation: "A counter-controlled loop needs a starting value, an ending value, and a changing counter.",
        requiredGroups: [["for", "while"], ["1"], [String(limit)], ["display", "write", "output"]]
      });
    })
  ]);

  add("while-loops", [
    trueFalse("while-pretest", "warm-up", ["while", "pretest"], (template) => question(template, {
      prompt: "A while loop checks its condition before the first pass.",
      choices: ["True", "False"],
      correctAnswer: "True",
      explanation: "A while loop is a pretest loop. If the condition starts false, its body can run zero times."
    })),
    multipleChoice("while-zero-passes", "warm-up", ["while", "pretest", "condition"], (template) => question(template, {
      prompt: "count starts at 8. The loop condition is count < 5. How many times does the loop body run?",
      choices: ["0", "1", "3", "8"],
      correctAnswer: "0",
      explanation: "The first condition check is false because 8 is not less than 5."
    })),
    traceOutput("while-increase", "level-up", ["while", "trace", "counter"], (template) => {
      const start = integer(0, 3);
      const step = integer(1, 3);
      const passes = integer(3, 5);
      const limit = start + step * passes;
      const values = Array.from({ length: passes }, (_, index) => start + index * step);
      return question(template, {
        prompt: "What is displayed?",
        code: "SET value = " + start + "\nWHILE value < " + limit + "\n    DISPLAY value\n    SET value = value + " + step + "\nEND WHILE",
        choices: [output(values), output([...values, limit]), output(values.slice().reverse()), String(limit)],
        correctAnswer: output(values),
        explanation: "The value is displayed before it changes. The loop stops when value reaches " + limit + "."
      });
    }),
    traceOutput("while-decrease", "level-up", ["while", "trace", "negative-step"], (template) => {
      const stop = integer(0, 3);
      const step = integer(1, 2);
      const passes = integer(3, 5);
      const start = stop + step * passes;
      const values = Array.from({ length: passes }, (_, index) => start - index * step);
      return question(template, {
        prompt: "What is displayed?",
        code: "SET level = " + start + "\nWHILE level > " + stop + "\n    DISPLAY level\n    SET level = level - " + step + "\nEND WHILE",
        choices: [output(values), output([...values, stop]), output(values.slice().reverse()), String(stop)],
        correctAnswer: output(values),
        explanation: "The body runs while level is greater than " + stop + ", and the update moves level toward the stopping point."
      });
    }),
    multipleChoice("while-missing-update", "level-up", ["while", "infinite-loop", "counter"], (template) => question(template, {
      prompt: "A while loop uses count < 10 but never changes count. What is the main risk?",
      choices: ["The loop may never stop", "The loop always runs once", "The condition becomes input", "The counter becomes a list"],
      correctAnswer: "The loop may never stop",
      explanation: "A loop-control variable must move toward a value that makes the condition false."
    })),
    shortResponse("while-write-countdown", "challenge", ["while", "pseudocode", "counter"], (template) => {
      const start = integer(4, 8);
      return question(template, {
        prompt: "Write short pseudocode that displays " + start + " down through 1 with a while loop.",
        correctAnswer: "SET count = " + start + "\nWHILE count >= 1\n    DISPLAY count\n    SET count = count - 1\nEND WHILE",
        explanation: "Initialize before the loop, test before each pass, and decrease inside the loop.",
        requiredGroups: [["set", "declare"], [String(start)], ["while"], [">=", "greater than or equal"], ["display", "write", "output"], ["- 1", "-1", "subtract 1"]]
      });
    })
  ]);

  add("validation-loops", [
    trueFalse("validation-purpose", "warm-up", ["validation", "while"], (template) => question(template, {
      prompt: "A validation loop repeats input steps while the current value is unacceptable.",
      choices: ["True", "False"],
      correctAnswer: "True",
      explanation: "Validation protects later calculations by refusing to continue with an unacceptable value."
    })),
    multipleChoice("validation-range-condition", "level-up", ["validation", "range", "logical-or"], (template) => {
      const low = integer(2, 10);
      const high = low + integer(8, 20);
      return question(template, {
        prompt: "A value must be from " + low + " through " + high + ", inclusive. Which condition means the value is invalid?",
        choices: ["value < " + low + " OR value > " + high, "value >= " + low + " AND value <= " + high, "value < " + low + " AND value > " + high, "value == " + low + " OR value == " + high],
        correctAnswer: "value < " + low + " OR value > " + high,
        explanation: "An invalid value is below the low boundary or above the high boundary."
      });
    }),
    multipleChoice("validation-repeat-until", "warm-up", ["validation", "range", "boundaries"], (template) => {
      const low = integer(1, 5);
      const high = low + integer(5, 12);
      return question(template, {
        prompt: "An entry must be between " + low + " and " + high + ", inclusive. When should the validation loop stop?",
        choices: ["When the entry is inside the range", "When the entry is below the range", "When the entry is above the range", "After exactly two attempts"],
        correctAnswer: "When the entry is inside the range",
        explanation: "Validation continues only while the entry breaks the rule."
      });
    }),
    traceOutput("validation-attempts", "level-up", ["validation", "trace", "counter"], (template) => {
      const low = integer(3, 7);
      const high = low + integer(5, 10);
      const valid = integer(low, high);
      return question(template, {
        prompt: "The entered values arrive in this order: " + (low - 2) + ", " + (high + 3) + ", " + valid + ". How many times is the invalid message displayed?",
        code: "INPUT value\nWHILE value < " + low + " OR value > " + high + "\n    DISPLAY \"Try again\"\n    INPUT value\nEND WHILE",
        choices: ["2", "1", "3", "0"],
        correctAnswer: "2",
        explanation: "The first two values are outside the range. The third value is accepted."
      });
    }),
    multipleChoice("validation-boundary", "level-up", ["validation", "inclusive", "boundaries"], (template) => {
      const low = integer(10, 20);
      const high = low + integer(10, 20);
      return question(template, {
        prompt: "The valid range is " + low + " through " + high + ", inclusive. Which value must be accepted?",
        choices: [String(low), String(low - 1), String(high + 1), String(high + 5)],
        correctAnswer: String(low),
        explanation: "Inclusive boundaries belong to the valid range, so the low boundary is accepted."
      });
    }),
    shortResponse("validation-write-range", "challenge", ["validation", "pseudocode", "range"], (template) => {
      const low = integer(1, 10);
      const high = low + integer(10, 25);
      return question(template, {
        prompt: "Write pseudocode that keeps asking for age until age is from " + low + " through " + high + ", inclusive.",
        correctAnswer: "INPUT age\nWHILE age < " + low + " OR age > " + high + "\n    DISPLAY \"Enter a value in range\"\n    INPUT age\nEND WHILE",
        explanation: "The first input happens before the loop, and another input must happen inside the loop after the message.",
        requiredGroups: [["input", "read", "get"], ["age"], ["while"], ["or"], [String(low)], [String(high)]]
      });
    })
  ]);

  add("accumulators", [
    trueFalse("accumulator-start-zero", "warm-up", ["accumulator", "initialization"], (template) => question(template, {
      prompt: "A running total normally starts at 0 before the loop begins.",
      choices: ["True", "False"],
      correctAnswer: "True",
      explanation: "Starting at 0 gives the accumulator a known neutral value before anything is added."
    })),
    multipleChoice("accumulator-update", "warm-up", ["accumulator", "update"], (template) => question(template, {
      prompt: "Which statement correctly adds number to a running total?",
      choices: ["SET total = total + number", "SET number = total", "SET total = 0", "SET total = number - total"],
      correctAnswer: "SET total = total + number",
      explanation: "The previous total must appear on the right so the new value includes everything collected so far."
    })),
    traceOutput("accumulator-sum", "level-up", ["accumulator", "trace", "sum"], (template) => {
      const values = [integer(2, 9), integer(2, 9), integer(2, 9)];
      const total = values.reduce((sum, value) => sum + value, 0);
      return question(template, {
        prompt: "The loop reads " + output(values) + ". What is displayed at the end?",
        code: "SET total = 0\nFOR EACH number\n    SET total = total + number\nEND FOR\nDISPLAY total",
        choices: [String(total), String(values[values.length - 1]), String(total - values[0]), String(values.length)],
        correctAnswer: String(total),
        explanation: "Each value is added to the total, so the final result is " + values.join(" + ") + " = " + total + "."
      });
    }),
    traceOutput("accumulator-average", "level-up", ["accumulator", "average", "counter"], (template) => {
      const count = integer(3, 5);
      const average = integer(4, 12);
      const total = count * average;
      return question(template, {
        prompt: "After a loop, total is " + total + " and count is " + count + ". What average is displayed?",
        code: "SET average = total / count\nDISPLAY average",
        choices: [String(average), String(total), String(count), String(total + count)],
        correctAnswer: String(average),
        explanation: "Average equals the accumulated total divided by the number of values."
      });
    }),
    multipleChoice("counter-vs-accumulator", "level-up", ["accumulator", "counter"], (template) => question(template, {
      prompt: "Which variable should increase by 1 for every value processed?",
      choices: ["The counter", "The running total", "The current input", "The final average"],
      correctAnswer: "The counter",
      explanation: "A counter tracks how many items were processed. An accumulator combines their values."
    })),
    shortResponse("accumulator-write-average", "challenge", ["accumulator", "average", "pseudocode"], (template) => {
      const count = integer(3, 6);
      return question(template, {
        prompt: "Write short pseudocode that reads " + count + " scores, builds a total, and displays their average.",
        correctAnswer: "SET total = 0\nFOR count = 1 TO " + count + "\n    INPUT score\n    SET total = total + score\nEND FOR\nSET average = total / " + count + "\nDISPLAY average",
        explanation: "Initialize the total before the loop, update it inside the loop, and divide only after all values are collected.",
        requiredGroups: [["total"], ["0"], ["for", "while"], ["input", "read", "get"], ["score"], ["+", "add"], ["/", "divide"], ["display", "write", "output"]]
      });
    })
  ]);

  add("nested-loops", [
    trueFalse("nested-inner-reset", "warm-up", ["nested-loop", "inner-loop"], (template) => question(template, {
      prompt: "The inner loop completes all of its passes for every one pass of the outer loop.",
      choices: ["True", "False"],
      correctAnswer: "True",
      explanation: "Each outer pass starts a complete run of the inner loop."
    })),
    multipleChoice("nested-pass-count", "warm-up", ["nested-loop", "multiplication"], (template) => {
      const outer = integer(2, 5);
      const inner = integer(2, 6);
      return question(template, {
        prompt: "An outer loop runs " + outer + " times and its inner loop runs " + inner + " times per outer pass. How many inner-body executions occur?",
        choices: [String(outer * inner), String(outer + inner), String(inner), String(outer)],
        correctAnswer: String(outer * inner),
        explanation: "Multiply the outer passes by the inner passes: " + outer + " x " + inner + " = " + (outer * inner) + "."
      });
    }),
    traceOutput("nested-pairs", "level-up", ["nested-loop", "trace", "pairs"], (template) => {
      const outer = integer(2, 3);
      const inner = integer(2, 3);
      const values = [];
      for (let row = 1; row <= outer; row += 1) {
        for (let column = 1; column <= inner; column += 1) values.push(row + "-" + column);
      }
      return question(template, {
        prompt: "What is displayed?",
        code: "FOR row = 1 TO " + outer + "\n    FOR column = 1 TO " + inner + "\n        DISPLAY row + \"-\" + column\n    END FOR\nEND FOR",
        choices: [output(values), output(values.slice().reverse()), output(values.filter((_, index) => index % inner === 0)), String(outer * inner)],
        correctAnswer: output(values),
        explanation: "For each row, column starts again at 1 and completes its full range."
      });
    }),
    traceOutput("nested-lines", "level-up", ["nested-loop", "trace", "output"], (template) => {
      const rows = integer(2, 4);
      const columns = integer(2, 5);
      const line = "#".repeat(columns);
      const display = Array.from({ length: rows }, () => line).join(" / ");
      return question(template, {
        prompt: "Treat each slash in the choices as a new line. What is displayed?",
        code: "FOR row = 1 TO " + rows + "\n    SET line = \"\"\n    FOR column = 1 TO " + columns + "\n        SET line = line + \"#\"\n    END FOR\n    DISPLAY line\nEND FOR",
        choices: [display, "#".repeat(rows * columns), line, Array.from({ length: rows }, () => "#").join(" / ")],
        correctAnswer: display,
        explanation: "The inner loop builds " + columns + " symbols, and the outer loop displays that line " + rows + " times."
      });
    }),
    multipleChoice("nested-update-owner", "level-up", ["nested-loop", "counter"], (template) => question(template, {
      prompt: "In a row-and-column pattern, which loop usually changes the column for each position across one row?",
      choices: ["The inner loop", "The outer loop", "A validation loop", "A sentinel check"],
      correctAnswer: "The inner loop",
      explanation: "The outer loop selects a row. The inner loop visits each position within that row."
    })),
    shortResponse("nested-write-grid", "challenge", ["nested-loop", "pseudocode", "grid"], (template) => {
      const rows = integer(2, 4);
      const columns = integer(3, 6);
      return question(template, {
        prompt: "Write pseudocode with nested loops that displays every row and column pair in a " + rows + " by " + columns + " grid.",
        correctAnswer: "FOR row = 1 TO " + rows + "\n    FOR column = 1 TO " + columns + "\n        DISPLAY row, column\n    END FOR\nEND FOR",
        explanation: "The outer loop controls rows, and the inner loop completes all columns inside each row.",
        requiredGroups: [["for", "while"], ["row"], [String(rows)], ["column"], [String(columns)], ["display", "write", "output"]]
      });
    })
  ]);

  add("arrays-lists", [
    trueFalse("list-related-values", "warm-up", ["array", "list", "collection"], (template) => question(template, {
      prompt: "A list is useful when one program needs to store many related values under one name.",
      choices: ["True", "False"],
      correctAnswer: "True",
      explanation: "A list groups related items and lets a loop process them by position."
    })),
    multipleChoice("list-best-use", "warm-up", ["array", "list", "recognition"], (template) => question(template, {
      prompt: "Which data is the best fit for one list?",
      choices: ["Ten daily step counts", "One person's first name", "One tax rate", "One true-or-false condition"],
      correctAnswer: "Ten daily step counts",
      explanation: "The values share one meaning and need repeated storage, so a list is a natural fit."
    })),
    traceOutput("list-fill", "level-up", ["array", "list", "loop", "trace"], (template) => {
      const start = integer(2, 5);
      const size = integer(3, 5);
      const step = integer(2, 4);
      const values = Array.from({ length: size }, (_, index) => start + index * step);
      return question(template, {
        prompt: "What values are stored in numbers?",
        code: "CREATE numbers WITH " + size + " ELEMENTS\nFOR index = 0 TO " + (size - 1) + "\n    SET numbers[index] = " + start + " + index * " + step + "\nEND FOR",
        choices: [output(values), output(values.slice().reverse()), output(values.map((value) => value - start)), String(size)],
        correctAnswer: output(values),
        explanation: "Substitute each index from 0 through " + (size - 1) + " into the formula."
      });
    }),
    traceOutput("list-sum", "level-up", ["array", "list", "accumulator", "trace"], (template) => {
      const values = [integer(1, 8), integer(1, 8), integer(1, 8), integer(1, 8)];
      const total = values.reduce((sum, value) => sum + value, 0);
      return question(template, {
        prompt: "values contains [" + values.join(", ") + "]. What is displayed?",
        code: "SET total = 0\nFOR EACH item IN values\n    SET total = total + item\nEND FOR\nDISPLAY total",
        choices: [String(total), String(values.length), String(values[values.length - 1]), String(total - values[0])],
        correctAnswer: String(total),
        explanation: "The loop visits every list element and adds each one to total."
      });
    }),
    multipleChoice("parallel-lists", "level-up", ["array", "list", "parallel"], (template) => question(template, {
      prompt: "names[2] and scores[2] describe the same person. What makes these lists parallel?",
      choices: ["Matching indexes connect related values", "They always contain text", "They must have different lengths", "They cannot be processed by loops"],
      correctAnswer: "Matching indexes connect related values",
      explanation: "Parallel lists use the same index to connect fields that belong to one record."
    })),
    shortResponse("list-write-input", "challenge", ["array", "list", "pseudocode", "loop"], (template) => {
      const size = integer(3, 6);
      return question(template, {
        prompt: "Write pseudocode that creates a list for " + size + " city names and fills it with user input.",
        correctAnswer: "CREATE cities WITH " + size + " ELEMENTS\nFOR index = 0 TO " + (size - 1) + "\n    INPUT cities[index]\nEND FOR",
        explanation: "Create the collection first, then use each valid index exactly once.",
        requiredGroups: [["cities", "city"], [String(size)], ["for", "while"], ["index"], ["input", "read", "get"]]
      });
    })
  ]);

  add("array-indexing", [
    trueFalse("index-start-zero", "warm-up", ["array", "list", "index"], (template) => question(template, {
      prompt: "In zero-based indexing, the first element is stored at index 0.",
      choices: ["True", "False"],
      correctAnswer: "True",
      explanation: "Zero-based collections number their positions 0, 1, 2, and so on."
    })),
    multipleChoice("index-last-position", "warm-up", ["array", "list", "index", "length"], (template) => {
      const length = integer(4, 9);
      return question(template, {
        prompt: "A zero-based list contains " + length + " elements. What is the last valid index?",
        choices: [String(length - 1), String(length), "1", "0"],
        correctAnswer: String(length - 1),
        explanation: "The last index is length - 1 because counting starts at 0."
      });
    }),
    traceOutput("index-read", "level-up", ["array", "list", "index", "trace"], (template) => {
      const values = shuffle([integer(10, 29), integer(30, 49), integer(50, 69), integer(70, 89)]);
      const index = integer(0, values.length - 1);
      return question(template, {
        prompt: "values is [" + values.join(", ") + "]. What does values[" + index + "] display?",
        choices: [String(values[index]), String(values[0]), String(values[values.length - 1]), String(index)],
        correctAnswer: String(values[index]),
        explanation: "Index " + index + " points to the " + (index + 1) + ordinalEnding(index + 1) + " element."
      });
    }),
    traceOutput("index-update", "level-up", ["array", "list", "index", "update"], (template) => {
      const values = [integer(2, 9), integer(2, 9), integer(2, 9), integer(2, 9)];
      const index = integer(0, 3);
      const amount = integer(2, 6);
      const updated = [...values];
      updated[index] += amount;
      return question(template, {
        prompt: "What does the list contain after the update?",
        code: "SET values = [" + values.join(", ") + "]\nSET values[" + index + "] = values[" + index + "] + " + amount,
        choices: [output(updated), output(values), output(values.map((value) => value + amount)), String(updated[index])],
        correctAnswer: output(updated),
        explanation: "Only the element at index " + index + " changes."
      });
    }),
    traceOutput("index-reverse", "level-up", ["array", "list", "reverse", "trace"], (template) => {
      const values = shuffle(["violet", "silver", "teal", "coral"]);
      return question(template, {
        prompt: "colors is [" + values.join(", ") + "]. What is displayed?",
        code: "FOR index = 3 DOWN TO 0\n    DISPLAY colors[index]\nEND FOR",
        choices: [output(values.slice().reverse()), output(values), values[3], output(values.slice(1).reverse())],
        correctAnswer: output(values.slice().reverse()),
        explanation: "The loop begins at the last valid index and moves toward 0."
      });
    }),
    shortResponse("index-write-reverse", "challenge", ["array", "list", "reverse", "pseudocode"], (template) => {
      const size = integer(4, 7);
      return question(template, {
        prompt: "Write pseudocode that displays every element of items in reverse order. The list contains " + size + " elements.",
        correctAnswer: "FOR index = " + (size - 1) + " DOWN TO 0\n    DISPLAY items[index]\nEND FOR",
        explanation: "Start at length - 1, include index 0, and decrease the index each pass.",
        requiredGroups: [["for", "while"], ["index"], [String(size - 1)], ["0"], ["items"], ["display", "write", "output"]]
      });
    })
  ]);

  add("trace-output", [
    traceOutput("trace-step-positive", "warm-up", ["trace", "loop", "positive-step"], (template) => {
      const start = integer(1, 3);
      const step = integer(2, 4);
      const values = Array.from({ length: 4 }, (_, index) => start + index * step);
      return question(template, {
        prompt: "What is displayed?",
        code: "FOR value = " + start + " TO " + values[3] + " STEP " + step + "\n    DISPLAY value\nEND FOR",
        choices: [output(values), output(values.slice().reverse()), output(values.map((value) => value + 1)), String(values[3])],
        correctAnswer: output(values),
        explanation: "Begin at " + start + " and add " + step + " after each pass."
      });
    }),
    traceOutput("trace-step-negative", "warm-up", ["trace", "loop", "negative-step"], (template) => {
      const start = integer(12, 18);
      const step = integer(2, 4);
      const values = Array.from({ length: 4 }, (_, index) => start - index * step);
      return question(template, {
        prompt: "What is displayed?",
        code: "FOR value = " + start + " DOWN TO " + values[3] + " STEP " + step + "\n    DISPLAY value\nEND FOR",
        choices: [output(values), output(values.slice().reverse()), output(values.map((value) => value - 1)), String(values[3])],
        correctAnswer: output(values),
        explanation: "A downward step subtracts " + step + " each time."
      });
    }),
    traceOutput("trace-total-each-pass", "level-up", ["trace", "accumulator", "loop"], (template) => {
      const add = integer(2, 5);
      const passes = integer(3, 5);
      const values = Array.from({ length: passes }, (_, index) => add * (index + 1));
      return question(template, {
        prompt: "What is displayed?",
        code: "SET total = 0\nFOR count = 1 TO " + passes + "\n    SET total = total + " + add + "\n    DISPLAY total\nEND FOR",
        choices: [output(values), String(values[values.length - 1]), output(Array.from({ length: passes }, () => add)), output(values.slice().reverse())],
        correctAnswer: output(values),
        explanation: "The output occurs after each update, so every running-total value appears."
      });
    }),
    traceOutput("trace-while-multiply", "level-up", ["trace", "while", "update"], (template) => {
      const start = integer(1, 3);
      const factor = 2;
      const passes = integer(3, 4);
      const values = Array.from({ length: passes }, (_, index) => start * Math.pow(factor, index));
      const limit = start * Math.pow(factor, passes);
      return question(template, {
        prompt: "What is displayed?",
        code: "SET value = " + start + "\nWHILE value < " + limit + "\n    DISPLAY value\n    SET value = value * 2\nEND WHILE",
        choices: [output(values), output([...values, limit]), output(values.slice().reverse()), String(limit)],
        correctAnswer: output(values),
        explanation: "The program displays first, then doubles value before the next condition check."
      });
    }),
    traceOutput("trace-nested-count", "challenge", ["trace", "nested-loop", "counter"], (template) => {
      const outer = integer(2, 4);
      const inner = integer(2, 4);
      const total = outer * inner;
      return question(template, {
        prompt: "What is displayed?",
        code: "SET count = 0\nFOR row = 1 TO " + outer + "\n    FOR column = 1 TO " + inner + "\n        SET count = count + 1\n    END FOR\nEND FOR\nDISPLAY count",
        choices: [String(total), String(outer + inner), String(inner), String(outer)],
        correctAnswer: String(total),
        explanation: "The update runs once for every row-column pair, so multiply " + outer + " by " + inner + "."
      });
    }),
    traceOutput("trace-list-even", "challenge", ["trace", "list", "decision"], (template) => {
      const values = shuffle([integer(2, 5) * 2, integer(2, 5) * 2 + 1, integer(6, 9) * 2, integer(6, 9) * 2 + 1]);
      const evens = values.filter((value) => value % 2 === 0);
      return question(template, {
        prompt: "numbers is [" + values.join(", ") + "]. What is displayed?",
        code: "FOR EACH number IN numbers\n    IF number MOD 2 == 0 THEN\n        DISPLAY number\n    END IF\nEND FOR",
        choices: [output(evens), output(values), output(values.filter((value) => value % 2 !== 0)), String(evens.length)],
        correctAnswer: output(evens),
        explanation: "Only values with a remainder of 0 after division by 2 are displayed."
      });
    })
  ]);

  add("write-pseudocode", [
    shortResponse("write-repeat-message", "warm-up", ["pseudocode", "loop", "output"], (template) => {
      const count = integer(3, 7);
      return question(template, {
        prompt: "Write pseudocode that displays \"Practice complete\" exactly " + count + " times.",
        correctAnswer: "FOR count = 1 TO " + count + "\n    DISPLAY \"Practice complete\"\nEND FOR",
        explanation: "A fixed number of repetitions calls for a counter-controlled loop.",
        requiredGroups: [["for", "while"], ["1"], [String(count)], ["display", "write", "output"], ["practice complete"]]
      });
    }),
    shortResponse("write-range-check", "level-up", ["pseudocode", "validation", "range"], (template) => {
      const low = integer(5, 15);
      const high = low + integer(10, 20);
      return question(template, {
        prompt: "Write pseudocode that keeps asking for quantity until it is from " + low + " through " + high + ".",
        correctAnswer: "INPUT quantity\nWHILE quantity < " + low + " OR quantity > " + high + "\n    DISPLAY \"Try again\"\n    INPUT quantity\nEND WHILE",
        explanation: "The invalid condition joins the two outside regions with OR.",
        requiredGroups: [["input", "read", "get"], ["quantity"], ["while"], ["or"], [String(low)], [String(high)]]
      });
    }),
    shortResponse("write-sentinel", "level-up", ["pseudocode", "while", "sentinel"], (template) => {
      const sentinel = pick([-1, 0, 99]);
      return question(template, {
        prompt: "Write pseudocode that reads values and stops when the user enters " + sentinel + ". Display every non-stop value.",
        correctAnswer: "INPUT value\nWHILE value != " + sentinel + "\n    DISPLAY value\n    INPUT value\nEND WHILE",
        explanation: "A priming input comes before the loop, and the next input belongs at the bottom of the loop body.",
        requiredGroups: [["input", "read", "get"], ["while"], ["!=", "not equal"], [String(sentinel)], ["display", "write", "output"]]
      });
    }),
    shortResponse("write-running-total", "level-up", ["pseudocode", "accumulator", "loop"], (template) => {
      const count = integer(3, 6);
      return question(template, {
        prompt: "Write pseudocode that reads " + count + " expense amounts and displays their total.",
        correctAnswer: "SET total = 0\nFOR count = 1 TO " + count + "\n    INPUT amount\n    SET total = total + amount\nEND FOR\nDISPLAY total",
        explanation: "The accumulator starts before the loop and changes once for each entered amount.",
        requiredGroups: [["total"], ["0"], ["for", "while"], ["input", "read", "get"], ["amount"], ["+", "add"], ["display", "write", "output"]]
      });
    }),
    shortResponse("write-fill-list", "challenge", ["pseudocode", "list", "loop"], (template) => {
      const size = integer(4, 7);
      return question(template, {
        prompt: "Write pseudocode that stores " + size + " workout durations in a list named minutes.",
        correctAnswer: "CREATE minutes WITH " + size + " ELEMENTS\nFOR index = 0 TO " + (size - 1) + "\n    INPUT minutes[index]\nEND FOR",
        explanation: "A zero-based collection with " + size + " elements uses indexes 0 through " + (size - 1) + ".",
        requiredGroups: [["minutes"], [String(size)], ["for", "while"], ["index"], ["input", "read", "get"]]
      });
    }),
    shortResponse("write-filter-list", "challenge", ["pseudocode", "list", "decision", "loop"], (template) => {
      const threshold = integer(10, 25);
      return question(template, {
        prompt: "Write pseudocode that displays each value in scores only when it is at least " + threshold + ".",
        correctAnswer: "FOR EACH score IN scores\n    IF score >= " + threshold + " THEN\n        DISPLAY score\n    END IF\nEND FOR",
        explanation: "The loop visits every element, and the decision controls which values are displayed.",
        requiredGroups: [["for", "while"], ["score"], ["if"], [">=", "greater than or equal"], [String(threshold)], ["display", "write", "output"]]
      });
    })
  ]);

  function ordinalEnding(value) {
    if (value % 100 >= 11 && value % 100 <= 13) return "th";
    if (value % 10 === 1) return "st";
    if (value % 10 === 2) return "nd";
    if (value % 10 === 3) return "rd";
    return "th";
  }

  function buildQuestionSet(topicId, count = 8) {
    const source = topicId === "mixed-review"
      ? templates
      : templates.filter((template) => template.topic === topicId);
    if (!source.length) return [];
    const selected = [];
    let cycle = shuffle(source);
    while (selected.length < count) {
      if (!cycle.length) cycle = shuffle(source);
      selected.push(cycle.pop());
    }
    return shuffle(selected.map((template) => template.build(template)));
  }

  function topicById(topicId) {
    return TOPICS.find((topic) => topic.id === topicId) || TOPICS[0];
  }

  function templateCount(topicId) {
    if (topicId === "mixed-review") return templates.length;
    return templates.filter((template) => template.topic === topicId).length;
  }

  global.ProgrammingPractice = Object.freeze({
    topics: TOPICS,
    buildQuestionSet,
    topicById,
    templateCount
  });
}(window));
