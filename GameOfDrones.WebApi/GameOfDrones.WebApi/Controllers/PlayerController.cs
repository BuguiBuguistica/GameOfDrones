using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using GameOfDrones.WebApi.Models;

namespace GameOfDrones.WebApi.Controllers
{
    //[RoutePrefix("api/Player")]
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PlayerController : ApiController
    {
        private GameOfDronesEntities db = new GameOfDronesEntities();

        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        // GET api/Default1
        public IQueryable<Player> GetPlayer()
        {
            return db.Player;
        }

        // GET api/Default1/5
        [ResponseType(typeof(Player))]
        public IHttpActionResult GetPlayer(int id)
        {
            Player player = db.Player.Find(id);
            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        // POST api/Default1/5
        public IHttpActionResult PutPlayer(Player player)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Player.Attach(player);
            db.Entry(player).State = EntityState.Modified;
            

            //if (id != player.Id)
            //{
            //    return BadRequest();
            //}

            //db.Entry(player).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!PlayerExists(id))
                //{
                //    return NotFound();
                //}
                //else
                //{
                throw;
                //}
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        

        // POST api/Default1
        [ResponseType(typeof(Player))]
        public IHttpActionResult PostPlayer(Player player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Player.Add(player);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (PlayerExists(player.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = player.Id }, player);
        }

        // DELETE api/Default1/5
        [ResponseType(typeof(Player))]
        public IHttpActionResult DeletePlayer(int id)
        {
            Player player = db.Player.Find(id);
            if (player == null)
            {
                return NotFound();
            }

            db.Player.Remove(player);
            db.SaveChanges();

            return Ok(player);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlayerExists(int id)
        {
            return db.Player.Count(e => e.Id == id) > 0;
        }
    }
}