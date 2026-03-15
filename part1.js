// =================================================
// ✅ ➊ Paste your model URL
// =================================================
   const URL = "https://teachablemachine.withgoogle.com/models/FZyRt_04C/";


// =================================================
// ✔️ Initialize the model and webcam
// =================================================
   // ⁉️ Assign variables
   let model, webcam, labelContainer, maxPredictions;
   // ⁉️ Tracks if a window has already been opened
   let hasOpenedWindow = false;
   // ⁉️ Probability threshold (80%) for triggering an action
   const THRESHOLD = 0.9;


   async function init() {
      // =================================================
      // ❌ No need to change
      // =================================================
      // ⁉️ URL + "model.json": Construct the model URL
      // ⁉️ URL + "metadata.json": Construct the metadata URL
      const modelURL = URL + "model.json"; 
      const metadataURL = URL + "metadata.json";

      // ⁉️ Load the model and get the number of prediction classes
      model = await tmImage.load(modelURL, metadataURL); 
      maxPredictions = model.getTotalClasses();

      // =================================================
      // ✅ ➋ new tmImage.Webcam(400, 400, true): 400x400 resolution
      //      🫲 true: mirror the webcam (flipped)
      //      🫱 false: showing the image as it is captured (not be flipped)
      // =================================================
      webcam = new tmImage.Webcam(400, 400, true); 
     
      // =================================================
      // ❌ No need to change
      // =================================================
      // ⁉️ Request access to the webcam
      await webcam.setup(); 
      // ⁉️ Start the webcam stream
      await webcam.play(); 
      // ⁉️ Start the loop function for continuous prediction
      requestAnimationFrame(loop); 

      // =================================================
      // ✔️ Create the webcam and label containers
      // =================================================
      // ⁉️ Append webcam canvas to the container
      $("#webcam-container").append(webcam.canvas); 
      // ⁉️ Select the label container for predictions
      labelContainer = $("#label-container"); 
      // ⁉️ Create a placeholder for each prediction label
      for (let i = 0; i < maxPredictions; i++) {
          labelContainer.append("<div></div>"); 
      }
   }


// =================================================
// ❌ No need to change: continuously updates the webcam feed and runs predictions in real-time
// =================================================
   async function loop() {
      // ⁉️ Update the webcam frame
      webcam.update();
      // ⁉️ Run prediction on the current frame
      await predict();
      // ⁉️ Continue the loop function for real-time updates
      requestAnimationFrame(loop);
   }


// =================================================
// ✔️ Runs the model’s prediction on the current webcam frame
// =================================================
   async function predict() {
      // ⁉️ Get predictions for the current webcam frame
      const prediction = await model.predict(webcam.canvas);
      // ⁉️ Create an array of probabilities from the prediction results
      const probabilities = prediction.map(p => p.probability);

      // ⁉️ Find the highest probability value
      let maxProb = Math.max(...probabilities);
      // ⁉️ Find the index of the highest probability class
      let maxIndex = probabilities.indexOf(maxProb);

      // =================================================
      // ✅ ➌ Apply _____ when a specific model is detected
      // =================================================

      // ==== NOTE: My original code but my gifs were not playing ====
      // if (maxIndex === 0) {
      //   document.querySelector("#mainText1").className = "black";
      //   document.querySelector("#mainText2").textContent = "Stage 1: Anticipation";
      //   document.querySelector("#image1").src = "./img/1A.gif";
      // //   document.body.style.backgroundColor = 'red';
      //   document.body.style.backgroundImage = "";
      // } 
      // else if (maxIndex === 1) {
      //   document.querySelector("#mainText1").className = "pink";
      //   document.querySelector("#mainText2").textContent = "If you're coming at 4, I'm already excited at 3";
      //   document.querySelector("#image1").src = "./img/1B.gif";
      //   document.body.style.backgroundImage = "url('./img/BG-1.png')";
      // } 

      // ==== NOTE: My gifs were not working/playing because Chrome was continuously restarting the gif ====
            // I checked everything before (ie. cache, if it was a real gif, etc etc)
            // I searched why Chrome was doing this, and then got help from ChatGPT to figure out how to prevent this from happening

      if (maxIndex === 0) {
         document.querySelector("#mainText1").className = "black";
         document.querySelector("#mainText2").textContent = "Stage 1: Anticipation";

         if (document.querySelector("#image1").src.indexOf("1A.gif") === -1) {
            document.querySelector("#image1").src = "./img/1A.gif";
         }

         document.body.style.backgroundImage = "";
         document.querySelector("#popup").style.display = "";
      } 
      else if (maxIndex === 1) {
         document.querySelector("#mainText1").className = "pink";
         document.querySelector("#mainText2").textContent = "If you're coming at 4, I'm already excited at 3";

         if (document.querySelector("#image1").src.indexOf("1B.gif") === -1) {
            document.querySelector("#image1").src = "./img/1B.gif";
         }

         document.body.style.backgroundImage = "url('./img/BG-1.png')";
         document.querySelector("#popup").style.display = "none";
      }


      // =================================================
      // ✔️ Display prediction results on the screen
      // =================================================
      $("#label-container").children().each((index, element) => {
          $(element).text(prediction[index].className + ": " + prediction[index].probability.toFixed(2));
      });
     
      // =================================================
   }

// =================================================
// ❌ No need to change: automatically run init() after the page loads
// =================================================
   $(document).ready(init);

// ==== PREVIOUS POP-UP LYRICS WINDOW ==== 
// const btn = document.getElementById("buttonL");
// const popup = document.getElementById("popup");

// btn.addEventListener("click", function(e) {
//   e.preventDefault();
//   popup.classList.toggle("active");
// });

// ==== Song Play/Pause function triggered by button ==== 
      // Help from online resources and ChatGPT to figure out how to change the text based on song (not played, playing, end playing)
const Sbtn = document.getElementById("songBtn");
const song = document.getElementById("bgSong");

Sbtn.addEventListener("click", function () {
   if (song.paused) {
      song.play();
      Sbtn.textContent = "Song Playing";
   } else {
      song.pause();
      Sbtn.textContent = "Play Song";
   }
});

song.addEventListener("ended", function() {
  Sbtn.textContent = "Play Song"; // reset button text
});
