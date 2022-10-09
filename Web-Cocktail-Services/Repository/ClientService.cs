using Web_Cocktail_Services.Core.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace Web_Cocktail_Services.Repository
{
    public class ClientService : IClientService, IDisposable
    {
        private readonly HttpClient client;
        private readonly IConfiguration Configuration;
        private bool disposedValue;

        public ClientService(IConfiguration configuration)
        {
            this.Configuration = configuration;
            client = new HttpClient
            {
                BaseAddress = new Uri(Configuration.GetSection("Thecocktail:thecocktailUri").Value)
            };

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<CocktailResponse> GetBebidasByName(string name)
        {
            CocktailResponse responseBebidas = new CocktailResponse();
            try
            {
                responseBebidas = await client.GetFromJsonAsync<CocktailResponse>(Configuration.GetSection("Thecocktail:GetNameBebidas").Value + name);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrio un error al intentar consultar las bebias" + ex.Message);
            }

            return responseBebidas;
        }

        public async Task<IngredientsResponse> GetBebidasByIngredient(string ingredient)
        {
            IngredientsResponse responseBebidas = new IngredientsResponse();
            try
            {
                responseBebidas = await client.GetFromJsonAsync<IngredientsResponse>(Configuration.GetSection("Thecocktail:GetIngredientBebidas").Value + ingredient);
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrio un error al intentar consultar las bebias" + ex.Message);
            }

            return responseBebidas;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    client.Dispose();
                }
                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
