using System.Collections.Generic;
using System.Threading.Tasks;
using BandsApp.API.Helpers;
using BandsApp.API.Models;

namespace BandsApp.API.Data
{
    public interface IBandsRepository
    {
         void Add<T> (T entity) where T: class;
         void Delete<T> (T entity) where T: class;
         Task<bool> SaveAll();
         Task<PagedList<User>> GetUsers(UserParams userParams);
         Task<User> GetUser(int id);
         Task<Photo> GetPhoto(int id); 
         Task<Photo> GetMainPhotoForUser(int userId);
    }
}