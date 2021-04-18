// $(document).ready( function () {
//     function newModal() {
//         var newModal = `
//   <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//         <h4 class="modal-title" id="myModalLabel">Modal title</h4>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>
//   `;
//         $('body').append(newModal);
//     }
//
//     $('#eBtn').on('click', newModal);
// })
// console.log('modal')

console.log('modal')
$(document).ready(function() {
    $('.eBtn').click(function (event) {
        $('#exampleModal').modal('toggle')
    });

    $(".delBtn").click(function (event) {
        $('#myModal').modal('toggle')
    })
})
