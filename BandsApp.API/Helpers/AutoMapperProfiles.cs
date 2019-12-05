using System.Linq;
using AutoMapper;
using BandsApp.API.Dtos;
using BandsApp.API.Models;

namespace BandsApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(destination => destination.PhotoUrl, option => option.MapFrom(src => 
                    src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(destination => destination.Age, option => option.MapFrom(src => 
                    src.DateOfBirth.CalculateAge()));

            CreateMap<User, UserForDetailedDto>()
                .ForMember(destination => destination.PhotoUrl, option => option.MapFrom(src => 
                    src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(destination => destination.Age, option => option.MapFrom(src => 
                    src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotosForDetailedDto>();

            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();



        }
    }
}