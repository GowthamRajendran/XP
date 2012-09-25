using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace MVCXPInternet.DAL
{
    public class DataEntryContext : DbContext
    {
        public DbSet<Batch> Batches { get; set; }
        public DbSet<RecordTemplate> RecordTemplates { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<Record> Records { get; set; }
        public DbSet<FieldInput> FieldInputs { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }
    }

    

    public class RecordTemplate
    {
        public int RecordTemplateId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual IList<Field> Fields { get; set; }
    }
        
    public class Field
    {
        public int FieldId { get; set; }
        public string Label { get; set; }
        public string Description { get; set; }
        public string HelpContent { get; set; }

        public FieldDataType fieldDataType { get; set; }
        public FieldInterface fieldInterface { get; set; }

        //For String DataType
        public int? MinLength { get; set; }
        public int? MaxLength { get; set; }

        //Numeric DataType
        public decimal? MinValue { get; set; }
        public decimal? MaxValue { get; set; }

        public virtual IList<Option> Options { get; set; }


        public int RecordTemplateId { get; set; }

    }

    public class Option
    {
        public int OptionId { get; set; }
        public string Label { get; set; }
        public string Value { get; set; }

        public int FieldId { get; set; }
        public virtual Field Field { get; set; }
    }

    public class Batch
    {
        public Guid BatchId { get; set; }
        public DateTime EntryDate { get; set; }
        public string AdditionalInformation { get; set; }

        public int RecordTemplateId { get; set; }
        public virtual RecordTemplate RecordTemplate { get; set; }

        public virtual IList<Record> Records { get; set; }
    }

    public class Record
    {
        public int RecordId { get; set; }
        
        public Status Status { get; set; }

        public virtual IList<FieldInput> InputData { get; set; }
        
        //public int RecordTemplateId { get; set; }
        //public virtual RecordTemplate RecordTemplate { get; set; }
        
        public Guid BatchId { get; set; }
        
    }

    public class FieldInput 
    {
        public int FieldInputId { get; set; }
        public int FieldId { get; set; }
        public string Value { get; set; }
        private int Test { get; set; }
        public int temp { get; set; }

        public int RecordId { get; set; }
    }

    public enum FieldDataType
    {
        String = 1,
        Integer = 2,
        Date = 1,
        DropDown = 2
    }

    public enum FieldInterface
    {
        TextBox = 1,
        NumericText = 2,
        DatePicker = 3,
        DropDown = 4
    }

    public enum Action
    {
        Create = 1,
        Update = 2,
        Delete = 3
    }

    public enum Status
    {
        Pending = 1,
        InProgress = 2,
        Complete = 3,
        Failed = 4
    }
}