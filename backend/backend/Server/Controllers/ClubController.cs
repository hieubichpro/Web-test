using AutoMapper;
using backend.BL.Exceptions;
using backend.BL.Models;
using backend.BL.Services;
using backend.DA.Entities;
using backend.Server.DTO;
using Microsoft.AspNetCore.Mvc;

namespace backend.Server.Controllers
{
    [ApiController]
    [Route("api/v1/clubs")]
    public class ClubController : ControllerBase
    {
        private ILogger<ClubController> _logger;
        private IMapper _mapper;
        private ClubService _clubService;
        public ClubController(ILogger<ClubController> logger, IMapper mapper, ClubService clubService)
        {
            _logger = logger;
            _mapper = mapper;
            _clubService = clubService;
        }
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult Create([FromBody] RawClubDto rawclubDto)
        {
            try
            {
                _clubService.InsertClub(_mapper.Map<RawClubDto, Club>(rawclubDto));
                return Ok();
            }
            catch (ClubExistException ex)
            {
                _logger.LogError("club exists");
                return Conflict();
            }
            catch (Exception ex)
            {
                _logger.LogError("server error");
                throw;
            }
        }
        //[HttpGet]
        //[ProducesResponseType(200)]
        //public IActionResult GetAll()
        //{
        //    var clubs = _clubService.GetAll();
        //    return Ok(clubs.Select(c => _mapper.Map<Club, ClubDto>(c)).ToList());
        //}

        [HttpGet]
        [ProducesResponseType(200)]
        public IActionResult GetAll([FromQuery] string? start_with)
        {
            var clubs = _clubService.GetClub(start_with);
            return Ok(clubs);
        }

        [HttpDelete("{idClub}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult Delete(int idClub)
        {
            try
            {
                _clubService.DeleteClub(idClub);
                return Ok();
            }
            catch (ClubNotFoundException ex)
            {
                _logger.LogError("club not exists");
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError("server error");
                throw;
            }
        }
        [HttpPut("{idClub}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult Update(int idClub, [FromBody]ClubDto clubDto)
        {
            try
            {
                _clubService.ModifyClub(idClub, _mapper.Map<ClubDto, Club>(clubDto));
                return Ok();
            }
            catch (ClubNotFoundException ex)
            {
                _logger.LogError("club not found");
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError("server error");
                throw;
            }
        }
        [HttpGet("{idClub}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Get(int idClub)
        {
            try
            {
                var club = _clubService.GetById(idClub);
                return Ok(club);
            }
            catch (ClubNotFoundException ex)
            {
                _logger.LogError("club not found");
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError("server error");
                throw;
            }
        }
    }
}
