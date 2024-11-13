import "@typespec/http";
import "@typespec/rest";
import "@typespec/versioning";

// Sample API and models
import "./models/sample/model.tsp";
import "./models/sample/operation.tsp";


using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.Versioning;

/**
 * TypeSpec with Swagger
 */
@service({
  title: "API Documentation for TypeSpec with Swagger",
})
@server("https://example.com", "Single server endpoint")

namespace API_DOCS;