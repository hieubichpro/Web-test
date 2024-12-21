using AutoMapper;
using backend.BL.Models;
using backend.DA.Entities;

namespace backend.DA.Mapper
{
    public class DAProfile : Profile
    {
        public DAProfile()
        {
            CreateMap<User, UserDb>();
            CreateMap<UserDb, User>();

            CreateMap<Club, ClubDb>();
            CreateMap<ClubDb, Club>();

            CreateMap<League, LeagueDb>();
            CreateMap<LeagueDb, League>();

            CreateMap<Match, MatchDb>();
            CreateMap<MatchDb, Match>();
        }
    }
}
