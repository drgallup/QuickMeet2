/*
Input: nothing, just call this
Output: a pdf
This how to generate a pdf using the jsPDF library and html2canvas
*/
function genPDF() 
{
  var pdf = new jsPDF('landscape');
  var options = 
  {
    //pagesplit:true
  };
  pdf.addHTML($('#cal')[0], options, function () {
      pdf.save('quickmeet.pdf');
  });
};
