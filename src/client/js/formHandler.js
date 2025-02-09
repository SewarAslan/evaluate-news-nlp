function handleSubmit(event) {
    event.preventDefault();

    // Get the URL input from the form
    let urlInput = document.getElementById("article-url").value;

    // Check if the input is empty
    if (!urlInput) {
        alert("Please enter a valid URL!");
        return;
    }

    console.log("::: Form Submitted :::");

    // Send request to the backend
    fetch("http://localhost:8000/analyze-url", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlInput }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the response on the webpage
        document.getElementById("results").innerHTML = `
            <p><strong>Sentiment:</strong> ${data.sentiment}</p>
            <p><strong>Sentiment Scores:</strong></p>
            <ul>
                <li>Positive: ${data.sentiment_scores.Positive}</li>
                <li>Negative: ${data.sentiment_scores.Negative}</li>
                <li>Neutral: ${data.sentiment_scores.Neutral}</li>
                <li>Mixed: ${data.sentiment_scores.Mixed}</li>
            </ul>
            <p><strong>Text Preview:</strong> ${data.text.slice(0, 200)}...</p>
        `;
    })
    .catch(error => console.error("Error:", error));
}

export { handleSubmit };
