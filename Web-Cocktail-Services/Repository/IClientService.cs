using Web_Cocktail_Services.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_Cocktail_Services.Repository
{
    public interface IClientService
    {
        Task<CocktailResponse> GetBebidasByName(string name);

        Task<IngredientsResponse> GetBebidasByIngredient(string ingredient);
    }
}
