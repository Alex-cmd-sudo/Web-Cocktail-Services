using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Web_Cocktail_Services.Core.Entities
{
    public class IngredientsResponse
    {
        [JsonPropertyName("ingredients")]
        public List<Ingredients> Ingredientes { get; set; }
    }

    public class Ingredients
    {
        [JsonPropertyName("strIngredient")]
        public string Ingrediente { get; set; }

        [JsonPropertyName("strDescription")]
        public string Descripcion { get; set; }
    }
}
