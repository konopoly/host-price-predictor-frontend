document.querySelectorAll(".form-second-page").forEach(function(el) {
    el.style.display = "none"
  }
)

const handleCitySelection = () => {
    const sectionToHide = document.querySelector(".form-first-page")
    sectionToHide.style.display = "none"

    document.querySelectorAll(".form-second-page").forEach(function(el) {
        el.style.display = "block"
      }
    )
}

const parseResponse = (body) => {
    const { predictions } = body
    const pricePrediction = predictions[0]['Prediction Price']

    const priceElement = document.querySelector("#price-content");
    const textContent = `Suggested price for your listing is: $${pricePrediction}`
    priceElement.textContent = textContent
}


const handlePredictionRequest = () => {
    const roomtypeInput = document.querySelector("#roomtype").value;
    const neighborhoodInput = document.querySelector("#neighborhood").value;
    const cancelationPolicyInput = document.querySelector("#cancelationpolicy").value;
    const reviewQuantityInput = document.querySelector("#reviewamount").value;
    const reviewInput = document.querySelector("#reviewscore").value;

    const data = {
        "neighborhood": neighborhoodInput,
        "room_type": roomtypeInput,
        "cancellation_policy": cancelationPolicyInput,
        "number_of_reviews": reviewQuantityInput,
        "review_rate_number": reviewInput
    }

    fetch('http://127.0.0.1:8000/price', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(body => parseResponse(body))
}

const btn = document.querySelector("#actionBtn");
btn.addEventListener("click", handlePredictionRequest);