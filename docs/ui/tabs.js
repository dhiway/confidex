
// tabs.js

function onFirstLoad(build_spec){
      let data = build_spec
      initSchema(data["x-enum"])
      loadAttributes(data["x-attributes"])
          loadFlows(data["x-flows"])
    //   initTag(data["x-tags"])
      loadExample(data["x-examples"])
      //addExample("on-demand")
    //   loadFlows(data["x-flows"])
  
      // console.log(data["x-attributes"]);
    //   loadErrors(data["x-errorcodes"])
    //   loadTlc(data["x-tlc"])
    //   loadtestcase(data["x-testcase"])
    // console.log(data["x-enum"]);
}

window.onload = function(){
      onFirstLoad(build_spec)
} 