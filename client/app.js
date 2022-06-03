$("#create").click(() => {
  $("#banner").hide();
  $("#dispChirps").hide();
  $("#newCreate").show();
});

$("#btn").click(() => {
  $.post("/api/chirps", {
    user: $("#nameInput").val(),
    text: $("#messageInput").val(),
  });
  $("#nameInput").val("");
  $("#messageInput").val("");
});

$("#timeline").click(() => {
  $("#banner").hide();
  $("#newCreate").hide();
  $("#dispChirps").show();
  $("#dispChirps").empty();
  $.get("/api/chirps").then((res) => {
    for (let i = 0; i < res.length; i++) {
      let newChirp = $(`
                <div class="col-12 col-md-4">
                    <div class="card bg-dark pb-4">
                    <button class="btn btn-outline-danger col-md-1" type="button" id="deleteBtn${res[i].id}">X</button>
                        <div class="card-body">
                            <h3 class="card-title text-light">${res[i].user}</h3>
                            <p class="card-text text-light">${res[i].text}</p>
                        </div>
                    </div>
                </div>
                `);
      $("#dispChirps").append(newChirp);
      $(`#deleteBtn${res[i].id}`).click(() => {
        console.log("delete btn clicked");
        $.ajax({
            url: `/api/chirps/delete/${res[i].id}`,
            method: "DELETE",
            success: console.log('successfully deleted chirp')
        });
        window.location.reload();
      });
    };
  });
});

// $('#deleteBtn0').click(() => {
//     console.log('this');
//     // $.ajax({
//     //     url: "/api/chirps/delete/:id",
//     //     type: "DELETE",
//     // })
// })
