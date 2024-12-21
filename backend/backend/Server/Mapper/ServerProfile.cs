using AutoMapper;
using backend.BL.Models;
using backend.Server.DTO;

namespace backend.Server.Mapper
{
    public class ServerProfile : Profile
    {
        public ServerProfile()
        {
            CreateMap<ClubDto, Club>();
            CreateMap<UserDto, User>();
            CreateMap<LeagueDto, League>();
            CreateMap<MatchDto, Match>();

            CreateMap<Club, ClubDto>();
            CreateMap<User, UserDto>();
            CreateMap<League, LeagueDto>();
            CreateMap<Match, MatchDto>();

            CreateMap<RawUserDto, User>();
            CreateMap<RawMatchDto, Match>();
            CreateMap<RawLeagueDto, League>();
            CreateMap<RawClubDto, Club>();

            CreateMap<RawChangePassword, User>();
        }
    }
}
