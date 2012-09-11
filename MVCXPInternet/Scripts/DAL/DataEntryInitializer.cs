using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace MVCXPInternet.DAL
{
    public class DataEntryInitializer : DropCreateDatabaseAlways<DataEntryContext>
    {
        protected override void Seed(DataEntryContext context)
        {
            base.Seed(context);

            context.RecordTemplates.Add(new RecordTemplate()
            {
                Name = "Test Record Template",
                Description = "",
                Fields = new List<Field>{
                    new Field() { 
                        Label = "First Name",
                        Description = "First part of your name.",
                        fieldDataType =  FieldDataType.String,
                        fieldInterface = FieldInterface.TextBox
                    },
                    new Field() { 
                        Label = "Last Name",
                        Description = "Last part of your name.",
                        fieldDataType =  FieldDataType.String,
                        fieldInterface = FieldInterface.TextBox
                    }
                }
            });

        }
    }
}