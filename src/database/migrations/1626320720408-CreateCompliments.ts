import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1626320720408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"compliments",
                columns:[
                    {
                        name:"id",
                        type: "uiid",
                        isPrimary:true
                    },
                    {
                        name:"user_sender",
                        type:"uiid"
                    },
                    {
                        name:"user_receiver",
                        type:"uiid"
                    },
                    {
                        name:"tag_id",
                        type:"uiid"
                    },
                    {
                        name:"message",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKUserSenderCompliments",
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        columnNames:["user_sender"],
                        onDelete:"SET NULL",
                        onUpdate:"SET NULL"
                    },
                    {
                        name:"FKUserReceiverCompliments",
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        columnNames:["user_receiver"],
                        onDelete:"SET NULL",
                        onUpdate:"SET NULL"
                    },
                    {
                        name:"FKTagCompliments",
                        referencedTableName:"tags",
                        referencedColumnNames:["id"],
                        columnNames:["tag_id"],
                        onDelete:"SET NULL",
                        onUpdate:"SET NULL"
                    }
                ]  
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('compliments');
    }

}
