import "@typespec/http";
import "@typespec/rest";
import "./model.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;

namespace API_DOCS {
  @tag("Pets")
  @route("/pets")
  namespace Pets {
    @get
    op listPets(): {
      @body pets: Pet[];
    };
  
    @get
    op getPet(@path petId: int32): {
      @body pet: Pet;
    } | {
      @body error: NotFoundError;
    };
  
    @post
    op createPet(@body pet: Pet): {
      @statusCode statusCode: 201;
      @body newPet: Pet;
    } | {
      @statusCode statusCode: 400;
      @body error: ValidationError;
    };
  
    @put
    op updatePet(@path petId: int32, @body pet: Pet): {
      @body updatedPet: Pet;
    } | {
      @body error: NotFoundError;
    };
  
    @delete
    op deletePet(@path petId: int32): {
      @statusCode statusCode: 204;
    } | {
      @body error: NotFoundError;
    };
  }
}