< script >

    userWords = []
defaultWords = [
    ["من", "في", "و", "ان", "'الله'", "على", "ما", "يا", "لا", "كل", "انا", "لو", "يوم", "الى", "بس", "اللي", "عن", "ولا", "هل", "كم", "مش", "مع", "اللهم"],
    ["من هناك"]
]
var predictions = [];
var staticPredictions = ['test1', 'test2'];

function findWords(currentWords) {

    // let found=true;
    const listToSearchIn = userWords[currentWords.length] || defaultWords[currentWords.length];
    // do {
        if (listToSearchIn[currentWords.join('|')]) {
            predictions.push(listToSearchIn[currentWords.join('|')]);
        }
    // }
    // while (predictions.length < 4 ); // should be 12 in the case of user values

    if (predictions.length === 0) {
        predictions = staticPredictions;
    }

    document.getElementById("demo").innerHTML = JSON.stringify(predictions);
}

findWords(['من']); 
</script>