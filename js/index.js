const loadDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiDetails(data.data)
}

const displayAiDetails = aiDetails => {
    const displayaHeader = document.getElementById('ai_modalLabel');
    displayaHeader.innerText = aiDetails.tool_name;

    const modalDetails = document.getElementById('modal_body');
    // console.log(aiDetails.mainFeatures.sensors[0]);
    modalDetails.innerHTML = `
                <div class="col-md-6 order-2 order-md-1 box_shadow mt-3">
                <p class="">${aiDetails.description}</p>
                <div class="d-flex justify-content-around align-items-center">
                    <p class="text-center text-success bg-white p-2 fw-semibold rounded">${aiDetails.pricing[0].price}<br>${aiDetails.pricing[0].plan}</p>
                    <p class="text-center text-warning bg-white p-2 fw-semibold rounded">${aiDetails.pricing[1].price}<br>${aiDetails.pricing[1].plan}</p>
                    <p class="text-center text-danger bg-white p-2 fw-semibold rounded">${aiDetails.pricing[2].price}<br>${aiDetails.pricing[2].plan}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center">

                        <div>
                            <h5 class="fw-bold">Features</h5>
                            <ul>
                                <li>${aiDetails.features[1].feature_name}</li>
                                <li>${aiDetails.features[2].feature_name}</li>
                                <li>${aiDetails.features[3].feature_name}</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h5 class="fw-bold">Integrations</h5>
                            <ul>
                                <li>${aiDetails.integrations[0] ? aiDetails.integrations[0] : 'No data found'}</li>
                                <li>${aiDetails.integrations[1] ? aiDetails.integrations[1] : 'No Data Found'}</li>
                                <li>${aiDetails.integrations[2] ? aiDetails.integrations[2] : 'No Data Found'}</li>
                            </ul>
                        </div>
                </div>
            </div>
            <div class="col-md-5 order-1 order-md-2 ">
                <div class="position-ralative">
                    <img class="img-fluid" src="${aiDetails.image_link[0]}" alt="">
                    <span class="bg-danger percentage ">${aiDetails.accuracy.score * 100}% accouracy</span>
                </div>
                <h4 class="text-center ">${aiDetails.input_output_examples[0].input}</h4>
                <p class="text-center">${aiDetails.input_output_examples[0].output}</p>
            </div>
    `;
}