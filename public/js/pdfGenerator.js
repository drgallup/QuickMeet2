function genPDF() {
  var pdf = new jsPDF('landscape');
  var options = 
  {
    //pagesplit:true
  };
  pdf.addHTML($('#cal')[0], options, function () {
      pdf.save('quickmeet.pdf');
  });
};
